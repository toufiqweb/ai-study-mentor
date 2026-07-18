"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSidebar } from "./SidebarProvider";

export default function DashboardNavbar() {
  const router = useRouter();
  const { setSidebarOpen } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form onSubmit={(e) => e.preventDefault()} className="relative hidden sm:block">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search goals, topics..."
            className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-10 pr-4 text-sm placeholder-gray-400 transition-colors focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
          />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative rounded-full p-2 text-gray-500 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-(--ternary)" />
        </button>

        {isPending ? (
          <div className="ml-2 flex items-center gap-3 animate-pulse">
            <div className="h-9 w-9 rounded-full bg-gray-100" />
            <div className="hidden h-4 w-20 rounded bg-gray-100 sm:block" />
          </div>
        ) : (
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary)/10 text-sm font-bold text-(--primary)">
                {session?.user?.name?.charAt(0).toUpperCase() ?? "S"}
              </div>
              <span className="hidden text-sm font-semibold text-gray-700 sm:block">
                {session?.user?.name ?? "Student"}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                <div className="border-b border-gray-100 px-4 py-2.5">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {session?.user?.name ?? "Student"}
                  </p>
                  <p className="truncate text-xs text-gray-400">{session?.user?.email}</p>
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <User className="h-4 w-4 text-gray-400" />
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
