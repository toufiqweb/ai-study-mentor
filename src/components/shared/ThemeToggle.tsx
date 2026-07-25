"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-(--secondary)/10 border border-(--card-border) animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-(--card-bg) hover:border-(--ternary)/50 border border-(--card-border) transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-(--ternary) focus:ring-offset-2 group cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-(--warning-icon) group-hover:text-(--warning)" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-(--ternary) group-hover:text-(--info-subtle)" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
