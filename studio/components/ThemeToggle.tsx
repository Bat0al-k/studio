"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-2 w-10 h-10" />; // Placeholder to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <FiSun className="w-6 h-6 text-white" />
      ) : (
        <FiMoon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  );
}
