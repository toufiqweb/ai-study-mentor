"use client";

import React from "react";
import Script from "next/script";
import { useCookieConsent } from "@/providers/CookieConsentProvider";

const TAWK_PROPERTY_ID = "6a64da8bb12e3c1d473a0382";
const TAWK_WIDGET_ID = "1jucvbd1r";
const TAWK_SRC = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

export default function TawkChat() {
  const { hasCategoryConsent } = useCookieConsent();
  const isAllowed = hasCategoryConsent("functional");

  if (!isAllowed) {
    return null;
  }

  return (
    <Script
      id="tawk-script"
      src={TAWK_SRC}
      strategy="lazyOnload"
      charSet="UTF-8"
      crossOrigin="anonymous"
    />
  );
}
