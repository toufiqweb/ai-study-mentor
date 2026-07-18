"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { GraduationCap, LogOut, User } from "lucide-react";
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

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full bg-(--primary) text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <GraduationCap className="w-6 h-6 text-(--ternary)" />
          AI Study Mentor
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                pathname === link.href ? "bg-white/10 text-white" : "text-gray-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isPending ? (
          <div className="w-24 h-9 rounded-lg bg-white/10 animate-pulse" />
        ) : session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
            <span className="hidden sm:flex items-center gap-2 text-sm text-gray-200">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name} className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-(--ternary)" />
              )}
              {session.user.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-bold px-4 py-2 rounded-lg bg-(--ternary) hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
