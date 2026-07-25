"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ALL_ACCEPTED_CATEGORIES,
  DEFAULT_CATEGORIES,
  getStoredConsent,
  setStoredConsent,
  type CookieCategories,
  type CookieConsentPayload,
} from "@/lib/cookie-consent";

interface CookieConsentContextType {
  consent: CookieConsentPayload | null;
  hasResponded: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustomConsent: (categories: CookieCategories) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  hasCategoryConsent: (category: keyof CookieCategories) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentPayload | null>(null);
  const [hasResponded, setHasResponded] = useState<boolean>(true); // Default true until mounted to avoid SSR layout flash
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      setHasResponded(true);
    } else {
      setConsent(null);
      setHasResponded(false);
    }
  }, []);

  const acceptAll = () => {
    const updated = setStoredConsent(ALL_ACCEPTED_CATEGORIES, consent?.acceptedAt);
    setConsent(updated);
    setHasResponded(true);
    setIsPreferencesOpen(false);
  };

  const rejectAll = () => {
    const updated = setStoredConsent(DEFAULT_CATEGORIES, consent?.acceptedAt);
    setConsent(updated);
    setHasResponded(true);
    setIsPreferencesOpen(false);
  };

  const saveCustomConsent = (categories: CookieCategories) => {
    const updated = setStoredConsent(categories, consent?.acceptedAt);
    setConsent(updated);
    setHasResponded(true);
    setIsPreferencesOpen(false);
  };

  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  const hasCategoryConsent = (category: keyof CookieCategories): boolean => {
    if (category === "necessary") return true;
    return !!consent?.categories?.[category];
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasResponded,
        isPreferencesOpen,
        acceptAll,
        rejectAll,
        saveCustomConsent,
        openPreferences,
        closePreferences,
        hasCategoryConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
