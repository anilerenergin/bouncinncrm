"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch by checking if we're on the client
  if (typeof window === "undefined") {
    return (
      <button className="p-2 rounded-lg border border-auth-card-border bg-auth-card-bg">
        <div className="h-5 w-5" />
      </button>
    );
  }
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-lg border border-auth-card-border bg-auth-card-bg hover:bg-auth-input-bg transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-auth-title" />
      ) : (
        <Moon className="h-5 w-5 text-auth-title" />
      )}
    </button>
  );
}
