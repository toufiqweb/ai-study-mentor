export {};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
              layout?: number;
            },
            containerId: string
          ): void;
        };
      };
    };
    /** Callback Google's translate_a/element.js invokes once it has loaded. */
    googleTranslateElementInit?: () => void;
    /** Guards against calling `new TranslateElement(...)` more than once per document. */
    __googleTranslateInitialized?: boolean;
    /** Guards against re-patching Node.prototype methods more than once per document. */
    __googleTranslateDomPatched?: boolean;
  }
}
