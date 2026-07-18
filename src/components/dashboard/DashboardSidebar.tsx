"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  PlusCircle,
  MessageCircleMore,
  BarChart3,
  User,
  Settings,
  LogOut,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSidebar } from "./SidebarProvider";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Goals", href: "/dashboard/goals", icon: Target },
  { label: "Create Goal", href: "/dashboard/goals/create", icon: PlusCircle },
  { label: "AI Mentor Chat", href: "/dashboard/chat", icon: MessageCircleMore },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-100 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-[72px]" : "w-[260px]"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
              <GraduationCap className="h-6 w-6 text-(--ternary)" />
              AI Study Mentor
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 lg:block"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-(--ternary) text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <link.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && link.label}
                </Link>
                {isCollapsed && (
                  <span className="pointer-events-none absolute top-1/2 left-full ml-2 -translate-y-1/2 rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {link.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-3">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
