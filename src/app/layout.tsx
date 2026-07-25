import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/shared/QueryProvider";
import GoogleTranslate from "@/components/shared/GoogleTranslate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Study Mentor",
  description: "Your AI-powered study companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-(--background) text-(--foreground)" suppressHydrationWarning>
        <GoogleTranslate />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
