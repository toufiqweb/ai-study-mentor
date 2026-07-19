"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
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
                  : "font-medium text-gray-500 hover:text-(--primary)"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isPending ? (
          <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
        ) : session?.user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-gray-50"
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
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                <Link
                  href="/dashboard"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-(--secondary) hover:bg-gray-50"
                >
                  <LayoutDashboard className="h-4 w-4 text-(--secondary)" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-(--primary)"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-(--ternary) px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
