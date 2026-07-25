export interface CookieCategories {
  necessary: boolean; // Always true (Locked)
  functional: boolean; // e.g. Google Translate, language preferences
  analytics: boolean; // e.g. GA4, Hotjar, Clarity
  marketing: boolean; // e.g. Meta Pixel, Google Ads
}

export interface CookieConsentPayload {
  version: number;
  acceptedAt: string;
  updatedAt: string;
  categories: CookieCategories;
}

export const CURRENT_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_NAME = "cookie_consent";

export const DEFAULT_CATEGORIES: CookieCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const ALL_ACCEPTED_CATEGORIES: CookieCategories = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

/**
  Parse consent payload from document.cookie safely.
 */
export function getStoredConsent(): CookieConsentPayload | null {
  if (typeof document === "undefined") return null;

  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + COOKIE_CONSENT_NAME + "=([^;]*)")
  );

  if (!matches || !matches[1]) return null;

  try {
    const decoded = decodeURIComponent(matches[1]);
    const parsed = JSON.parse(decoded) as CookieConsentPayload;

    // Check version compliance
    if (!parsed || typeof parsed.version !== "number" || parsed.version < CURRENT_CONSENT_VERSION) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save consent payload into browser cookie.
 */
export function setStoredConsent(categories: CookieCategories, initialAcceptedAt?: string): CookieConsentPayload {
  const now = new Date().toISOString();
  const payload: CookieConsentPayload = {
    version: CURRENT_CONSENT_VERSION,
    acceptedAt: initialAcceptedAt || now,
    updatedAt: now,
    categories: {
      necessary: true, // Always locked to true
      functional: !!categories.functional,
      analytics: !!categories.analytics,
      marketing: !!categories.marketing,
    },
  };

  if (typeof document !== "undefined") {
    const jsonString = JSON.stringify(payload);
    const encoded = encodeURIComponent(jsonString);
    const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
    const isSecure = window.location.protocol === "https:";

    let cookieStr = `${COOKIE_CONSENT_NAME}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax`;
    if (isSecure) {
      cookieStr += "; Secure";
    }

    document.cookie = cookieStr;
  }

  return payload;
}
