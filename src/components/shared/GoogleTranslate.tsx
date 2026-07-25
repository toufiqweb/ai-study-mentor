"use client";

import Script from "next/script";
import { useCallback, useEffect } from "react";

const SCRIPT_SRC =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

const CONTAINER_ID = "google_translate_element";

export type GoogleTranslateLanguage = "en" | "bn";

/**
 * Google Translate rewrites text nodes in place (wrapping them in <font> tags)
 * without React's knowledge. When React later reconciles that same subtree —
 * e.g. the Navbar swapping its session-loading skeleton for the real menu —
 * it calls removeChild/insertBefore on a node that's no longer where React
 * thinks it is, throws a NotFoundError, and the whole subtree (the navbar,
 * in practice) unmounts. This patches both methods to fail soft instead of
 * throwing. This is the standard workaround for this well-documented
 * React/Google Translate incompatibility (facebook/react#11538).
 */
function patchDomForGoogleTranslate() {
  if (window.__googleTranslateDomPatched) return;
  window.__googleTranslateDomPatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(
    this: Node,
    child: T
  ): T {
    if (child.parentNode !== this) {
      if (child.parentNode) {
        return child.parentNode.removeChild(child) as T;
      }
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

/**
 * Renders `new google.translate.TranslateElement(...)` into `#google_translate_element`.
 * Safe to call more than once — every call after the first is a no-op, guarded by
 * `window.__googleTranslateInitialized`. This lets both Google's own load callback and
 * next/script's `onReady` (which also fires when the script was already loaded, e.g. from
 * bfcache) call it without creating duplicate translator instances.
 */
function initializeGoogleTranslate() {
  if (window.__googleTranslateInitialized) return;
  if (!window.google?.translate?.TranslateElement) return;

  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,bn",
      autoDisplay: false,
    },
    CONTAINER_ID
  );

  window.__googleTranslateInitialized = true;
}

/**
 * Helper to clear Google Translate cookies so reverting to original language (English) works consistently.
 */
function clearGoogtransCookies() {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");

  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;

  while (domainParts.length > 1) {
    const domain = domainParts.join(".");
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    domainParts.shift();
  }
}

/**
 * Helper to set Google Translate cookie.
 */
function setGoogtransCookie(value: string) {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;
  document.cookie = `googtrans=${value}; path=/;`;
  document.cookie = `googtrans=${value}; path=/; domain=${hostname};`;
}

/**
 * Programmatically switches the translated language by driving the hidden
 * `<select class="goog-te-combo">` that the widget renders into our container.
 * Google's widget only reacts to a native `change` event (not React's synthetic
 * one), so we dispatch a real DOM event. The select may not exist yet the first
 * time this is called (widget still initializing), so we retry briefly.
 */
export function setGoogleTranslateLanguage(
  lang: GoogleTranslateLanguage,
  attempt = 0
) {
  if (typeof window === "undefined") return;

  if (lang === "en") {
    clearGoogtransCookies();
    const select = document.querySelector<HTMLSelectElement>(
      `#${CONTAINER_ID} select.goog-te-combo`
    );
    if (select) {
      select.selectedIndex = 0;
      select.value = "";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    window.location.reload();
    return;
  }

  const select = document.querySelector<HTMLSelectElement>(
    `#${CONTAINER_ID} select.goog-te-combo`
  );

  if (!select) {
    if (attempt < 15) {
      setTimeout(() => setGoogleTranslateLanguage(lang, attempt + 1), 150);
    }
    return;
  }

  setGoogtransCookie(`/en/${lang}`);
  select.selectedIndex = 0;

  const targetOption = Array.from(select.options).find(
    (opt) => opt.value === lang
  );
  select.value = targetOption ? targetOption.value : lang;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  select.dispatchEvent(new Event("input", { bubbles: true }));
}

/**
 * Reads the language Google Translate last applied from its own `googtrans`
 * cookie (format `/en/bn`), so UI that reflects the active language survives
 * a full page reload without waiting on the widget to re-initialize.
 */
export function getGoogleTranslateLanguage(): GoogleTranslateLanguage {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
  return match?.[1] === "bn" ? "bn" : "en";
}

export default function GoogleTranslate() {
  const initialize = useCallback(() => initializeGoogleTranslate(), []);

  useEffect(() => {
    patchDomForGoogleTranslate();
    window.googleTranslateElementInit = initialize;

    // Browser back/forward cache restores the page (and `window.google`)
    // without re-running <script> tags, so Google's own callback never
    // fires again. If the API is already present, initialize directly.
    if (window.google?.translate?.TranslateElement) {
      initialize();
    }
  }, [initialize]);

  return (
    <>
      <Script
        id="google-translate-script"
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onReady={initialize}
      />
      <div id={CONTAINER_ID} className="sr-only" aria-hidden="true" />
    </>
  );
}
