"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function SmoothThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-transform hover:scale-105 active:scale-95">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    // Add smooth transition class to document
    document.documentElement.style.setProperty('--theme-transition', 'all 0.3s ease-in-out');
    
    // Toggle theme
    setTheme(isDark ? "light" : "dark");
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.style.removeProperty('--theme-transition');
    }, 300);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 ${
        isDark ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <div
        className={`absolute inset-2 transition-all duration-200 ${
          isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
        }`}
      >
        <Sun className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div
        className={`absolute inset-2 transition-all duration-200 ${
          isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
        }`}
      >
        <Moon className="w-5 h-5 text-blue-400" />
      </div>
      
      {/* Invisible placeholder to maintain button size */}
      <div className="w-5 h-5 opacity-0">
        <Sun className="w-5 h-5" />
      </div>
    </button>
  );
}