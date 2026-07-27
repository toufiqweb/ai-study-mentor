"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, Globe, BarChart3, Megaphone } from "lucide-react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { DEFAULT_CATEGORIES, type CookieCategories } from "@/lib/cookie-consent";

export default function CookiePreferencesModal() {
  const { consent, isPreferencesOpen, closePreferences, saveCustomConsent, acceptAll, rejectAll } =
    useCookieConsent();

  const [categories, setCategories] = useState<CookieCategories>(DEFAULT_CATEGORIES);

  // Sync state with current consent when modal opens
  useEffect(() => {
    if (isPreferencesOpen) {
      setCategories(consent?.categories || DEFAULT_CATEGORIES);
    }
  }, [isPreferencesOpen, consent]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPreferencesOpen) {
        closePreferences();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreferencesOpen, closePreferences]);

  if (!isPreferencesOpen) return null;

  const toggleCategory = (key: keyof CookieCategories) => {
    if (key === "necessary") return; // Locked
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    saveCustomConsent(categories);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-(--black)/50 p-4 backdrop-blur-xs"
        onClick={closePreferences}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-(--border-subtle) bg-(--surface) p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
            <div>
              <h2 id="cookie-modal-title" className="text-xl font-bold text-(--text-strong)">
                Cookie Preferences
              </h2>
              <p className="mt-1 text-xs text-(--text-muted)">
                Manage your consent preferences for cookies and scripts on our website.
              </p>
            </div>
            <button
              type="button"
              onClick={closePreferences}
              className="rounded-full p-2 text-(--text-subtle) hover:bg-(--surface-subtle) hover:text-(--text-body)"
              aria-label="Close preferences"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Categories List */}
          <div className="mt-5 space-y-4">
            {/* Necessary */}
            <div className="flex items-start justify-between rounded-2xl border border-(--border-subtle) bg-(--surface-muted) p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-(--success)" />
                <div>
                  <h3 className="text-sm font-bold text-(--text-strong)">
                    Strictly Necessary <span className="text-xs text-(--success) font-semibold">(Always Active)</span>
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
                    Essential for security, session management, CSRF protection, and core functionality. Cannot be turned off.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled
                className="mt-1 h-5 w-5 rounded border-(--border-strong) text-(--ternary) focus:ring-(--ternary) accent-(--ternary) cursor-not-allowed opacity-75"
              />
            </div>

            {/* Functional */}
            <div className="flex items-start justify-between rounded-2xl border border-(--border-subtle) p-4 transition-colors hover:border-(--border-default)">
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-(--info)" />
                <div>
                  <h3 className="text-sm font-bold text-(--text-strong)">Functional Cookies</h3>
                  <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
                    Enables enhanced features like Google Website Translation and user language preferences across reloads.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={categories.functional}
                onChange={() => toggleCategory("functional")}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-(--border-strong) text-(--ternary) focus:ring-(--ternary) accent-(--ternary)"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between rounded-2xl border border-(--border-subtle) p-4 transition-colors hover:border-(--border-default)">
              <div className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-(--warning)" />
                <div>
                  <h3 className="text-sm font-bold text-(--text-strong)">Analytics Cookies</h3>
                  <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
                    Helps us understand how visitors interact with the site so we can improve roadmaps and user experience.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={categories.analytics}
                onChange={() => toggleCategory("analytics")}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-(--border-strong) text-(--ternary) focus:ring-(--ternary) accent-(--ternary)"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between rounded-2xl border border-(--border-subtle) p-4 transition-colors hover:border-(--border-default)">
              <div className="flex items-start gap-3">
                <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-(--info-alt)" />
                <div>
                  <h3 className="text-sm font-bold text-(--text-strong)">Marketing Cookies</h3>
                  <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
                    Used to deliver relevant announcements and measure marketing campaign effectiveness.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={categories.marketing}
                onChange={() => toggleCategory("marketing")}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-(--border-strong) text-(--ternary) focus:ring-(--ternary) accent-(--ternary)"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-(--border-subtle) pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-xl bg-(--surface-subtle) px-3.5 py-2 text-xs font-bold text-(--text-body) transition-colors hover:bg-(--neutral-200)"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-xl bg-(--surface-subtle) px-3.5 py-2 text-xs font-bold text-(--text-body) transition-colors hover:bg-(--neutral-200)"
              >
                Accept All
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-(--action-bg) px-5 py-2.5 text-xs font-bold text-(--action-text) shadow-sm transition-colors hover:bg-(--action-hover)"
            >
              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
