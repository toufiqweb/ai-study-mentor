"use client";

import React from "react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

interface CookiePolicyLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CookiePolicyLink({
  className = "text-sm text-(--text-secondary) transition-colors hover:text-(--primary)",
  children = "Cookie Settings",
}: CookiePolicyLinkProps) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={`cursor-pointer focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}
