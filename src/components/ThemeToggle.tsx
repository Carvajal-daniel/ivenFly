"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // evita erro de hidratação no Next
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative cursor-pointer flex md:ml-6 items-center justify-center w-12 h-10 rounded-2xl transition-all duration-300 bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-yellow-500/20 hover:scale-105 border border-gray-600 dark:border-gray-700 group overflow-hidden"
      aria-label="Alternar tema"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-yellow-500/20 dark:to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Icons with animation */}
      <div className="relative z-10">
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          ) : (
            <Moon className="w-6 h-6 text-blue-200 drop-shadow-[0_0_8px_rgba(191,219,254,0.5)]" />
          )}
        </motion.div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        initial={false}
      />
    </motion.button>
  );
}