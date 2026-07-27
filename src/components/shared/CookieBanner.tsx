"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Settings } from "lucide-react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

export default function CookieBanner() {
  const { hasResponded, acceptAll, rejectAll, openPreferences } = useCookieConsent();

  // Don't render banner if user has already responded to consent
  if (hasResponded) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        className="fixed bottom-4 left-4 right-4 z-40 max-w-md rounded-2xl border border-(--border-subtle) bg-(--surface)/95 p-5 shadow-2xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--ternary)/10 text-(--ternary)">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 id="cookie-banner-title" className="text-base font-bold text-(--text-strong)">
              Cookie Preferences
            </h3>
            <p id="cookie-banner-description" className="mt-1 text-xs leading-5 text-(--text-secondary)">
              We use cookies to enhance your learning experience, remember your language choice, and analyze platform usage. You can manage your choices below.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-(--border-subtle) pt-3">
          <button
            type="button"
            onClick={openPreferences}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-(--text-secondary) transition-colors hover:bg-(--surface-subtle) hover:text-(--text-strong) focus:outline-none"
          >
            <Settings className="h-3.5 w-3.5" />
            Customize
          </button>

          <button
            type="button"
            onClick={rejectAll}
            className="rounded-lg bg-(--surface-subtle) px-3.5 py-2 text-xs font-bold text-(--text-body) transition-colors hover:bg-(--neutral-200) focus:outline-none"
          >
            Reject All
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg bg-(--action-bg) px-4 py-2 text-xs font-bold text-(--action-text) shadow-sm transition-colors hover:bg-(--action-hover) focus:outline-none"
          >
            Accept All
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
