"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, ChevronDown, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  getGoogleTranslateLanguage,
  setGoogleTranslateLanguage,
  type GoogleTranslateLanguage,
} from "@/components/shared/GoogleTranslate";
import ThemeToggle from "@/components/shared/ThemeToggle";

const publicLinks = [
  { label: "Explore Roadmaps", href: "/explore-roadmaps" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Lazy-initialized from Google's `googtrans` cookie so the switcher reflects
  // the active language across reloads. Read only on the client (falls back to
  // "en" during SSR), so the two buttons below carry `suppressHydrationWarning`.
  const [language, setLanguage] = useState<GoogleTranslateLanguage>(() =>
    getGoogleTranslateLanguage(),
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: GoogleTranslateLanguage) => {
    setLanguage(lang);
    setGoogleTranslateLanguage(lang);
  };

  useEffect(() => {
    setLanguage(getGoogleTranslateLanguage());
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--nav-border) bg-(--nav-bg) backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-(--primary)"
        >
          <Image
            src="/logo.png"
            alt="AI Study Mentor"
            width={28}
            height={28}
            className="object-contain"
          />
          AI Study Mentor
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "font-semibold text-(--primary)"
                  : "font-medium text-(--secondary) hover:text-(--primary)"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div
            className="notranslate hidden items-center gap-1 rounded-full border border-card-border bg-card-bg/50 p-1 md:flex"
            translate="no"
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              aria-pressed={language === "en"}
              suppressHydrationWarning
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                language === "en"
                  ? "bg-(--primary) text-(--background)"
                  : "text-(--text-muted) hover:text-(--primary)"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("bn")}
              aria-pressed={language === "bn"}
              suppressHydrationWarning
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                language === "bn"
                  ? "bg-(--primary) text-(--background)"
                  : "text-(--text-muted) hover:text-(--primary)"
              }`}
            >
              BAN
            </button>
          </div>

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-(--surface-subtle)" />
          ) : session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-(--surface-muted)"
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session?.user?.image}
                    alt={session?.user?.name || "user"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary)/10 text-sm font-bold text-(--primary)">
                    {session?.user?.name?.charAt(0).toUpperCase() ?? "S"}
                  </div>
                )}
                <span className="hidden text-sm font-semibold text-(--primary) sm:block">
                  {session?.user?.name}
                </span>
                <ChevronDown className="hidden h-4 w-4 text-(--secondary) sm:block" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-(--border-subtle) bg-(--surface) py-2 shadow-xl">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-(--secondary) hover:bg-(--surface-muted)"
                  >
                    <LayoutDashboard className="h-4 w-4 text-(--secondary)" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-(--error) hover:bg-(--error-subtle)"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/register"
              className="rounded-lg bg-(--ternary) px-3.5 py-2 text-sm font-bold text-(--white) shadow-sm transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5"
            >
              Get Started
            </Link>
          )}

          {/* Small Device Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-(--text-secondary) hover:bg-(--surface-subtle) hover:text-(--text-strong) md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Small Device Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-(--border-subtle) bg-(--surface) px-4 pt-3 pb-6 md:hidden shadow-lg">
          <div className="flex flex-col space-y-3">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-base transition-colors ${
                  pathname === link.href
                    ? "bg-(--surface-muted) font-semibold text-(--primary)"
                    : "font-medium text-(--text-secondary) hover:bg-(--surface-muted) hover:text-(--primary)"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-1 border-t border-(--border-subtle) pt-3">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-sm font-medium text-(--text-muted)">
                  Language
                </span>
                <div
                  className="notranslate flex items-center gap-1 rounded-full border border-(--border-default) p-1"
                  translate="no"
                >
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("en")}
                    aria-pressed={language === "en"}
                    suppressHydrationWarning
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      language === "en"
                        ? "bg-(--primary) text-(--background)"
                        : "text-(--text-muted) hover:text-(--primary)"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("bn")}
                    aria-pressed={language === "bn"}
                    suppressHydrationWarning
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      language === "bn"
                        ? "bg-(--primary) text-(--background)"
                        : "text-(--text-muted) hover:text-(--primary)"
                    }`}
                  >
                    BAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
