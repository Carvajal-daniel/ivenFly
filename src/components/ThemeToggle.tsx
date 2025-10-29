"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // evita erro de hidratação no Next
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3 md:ml-6">
      {/* Ícone do Sol */}
      <motion.div
        animate={{
          scale: !isDark ? 1.2 : 1,
          opacity: !isDark ? 1 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-amber-500"
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path
            d="M12 1v3m0 16v3M23 12h-3M4 12H1m18.364-6.364l-2.121 2.121M6.757 17.243l-2.121 2.121m12.728 0l-2.121-2.121M6.757 6.757L4.636 4.636"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Toggle Switch */}
      <motion.button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative w-14 h-7 rounded-full transition-colors duration-500 bg-gray-300 dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-600"
        aria-label="Alternar tema"
        whileTap={{ scale: 0.95 }}
      >
        {/* Bolinha que se move */}
        <motion.div
          className="absolute top-0.5 w-5 h-5 md:mt-0.5 rounded-full bg-white dark:bg-gray-900 shadow-lg"
          animate={{
            x: isDark ? 26 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 40,
          }}
        />
      </motion.button>

      {/* Ícone da Lua */}
      <motion.div
        animate={{
          scale: isDark ? 1.2 : 1,
          opacity: isDark ? 1 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-indigo-500"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
}