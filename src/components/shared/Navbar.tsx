"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
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

        {isPending ? (
          <div className="w-24 h-9 rounded-lg bg-white/10 animate-pulse" />
        ) : session?.user ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 text-sm text-gray-200">
              <User className="w-4 h-4 text-(--ternary)" />
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
