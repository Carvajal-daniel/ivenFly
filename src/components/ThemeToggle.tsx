import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importe isso do seu projeto: import { useTheme } from "next-themes";
// Por ora, vou simular para o demo funcionar
function useTheme() {
  const [theme, setThemeState] = useState("light");
  
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setThemeState(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);
  
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  return { theme, setTheme };
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
 
      transition={{ type: "spring", stiffness: 300, damping: 17 }}
      aria-label="Alternar tema"
    >
      {/* Container dos ícones */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              {/* Sol */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-amber-500"
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path
                  d="M12 1v3m0 16v3M23 12h-3M4 12H1m18.364-6.364l-2.121 2.121M6.757 17.243l-2.121 2.121m12.728 0l-2.121-2.121M6.757 6.757L4.636 4.636"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              {/* Lua */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-indigo-400"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Borda interna sutil */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
    </motion.button>
  );
}

// Demo
function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Theme Toggle
        </h1>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Demo;