"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative w-10 h-10 flex items-center justify-center border-3 border-black bg-neo-yellow text-black shadow-neo-sm"
        aria-label="Toggle Theme"
      >
        <span className="w-5 h-5 block" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className={`
        relative w-10 h-10 flex items-center justify-center overflow-hidden
        border-3 border-black dark:border-white
        shadow-neo-sm
        hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo
        active:translate-x-0 active:translate-y-0 active:shadow-neo-sm
        transition-all duration-200 cursor-pointer
        ${isDark ? "bg-neo-purple" : "bg-neo-yellow"}
      `}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to bright mode" : "Switch to dark mode"}
    >
      {/* Sun icon — visible in light mode */}
      <Sun
        className={`
          w-5 h-5 text-black absolute
          transition-all duration-500 ease-in-out
          ${!isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
          }
        `}
      />
      {/* Moon icon — visible in dark mode */}
      <Moon
        className={`
          w-5 h-5 text-black absolute
          transition-all duration-500 ease-in-out
          ${!isDark
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
          }
        `}
      />
    </button>
  );
}
