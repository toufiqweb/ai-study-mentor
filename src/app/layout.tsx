import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/shared/QueryProvider";
import GoogleTranslate from "@/components/shared/GoogleTranslate";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { CookieConsentProvider } from "@/providers/CookieConsentProvider";
import CookieBanner from "@/components/shared/CookieBanner";
import CookiePreferencesModal from "@/components/shared/CookiePreferencesModal";
import TawkChat from "@/components/shared/TawkChat";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Study Mentor",
  description: "Your AI-powered study companion.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CookieConsentProvider>
            <Toaster richColors position="top-right" closeButton />
            <GoogleTranslate />
            <QueryProvider>{children}</QueryProvider>
            <WhatsAppButton />
            <TawkChat />
            <CookieBanner />
            <CookiePreferencesModal />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
