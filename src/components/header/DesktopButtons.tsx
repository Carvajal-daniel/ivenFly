"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { useCurrentUser } from "@/constantes/api/useCurrentUser";
import { LogIn, LayoutDashboard, Sparkles, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
  <div className="hidden md:flex items-center space-x-4">
    <Skeleton className="h-10 w-32 rounded-lg" />
    <Skeleton className="h-10 w-32 rounded-lg" />
    <Skeleton className="h-10 w-10 rounded-lg" />
  </div>
);

export const DesktopButtons = () => {
  const { user, loading } = useCurrentUser();

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="hidden md:flex items-center gap-3">
      {/* User Greeting or Login */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {user ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800 shadow-md">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Olá, {user.name ?? "Usuário"}
            </span>
          </div>
        ) : (
          <Link href="/auth">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="group relative overflow-hidden border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-black/80 dark:text-white">Login</span>
            </Button>
          </Link>
        )}
      </motion.div>

      {/* Dashboard or Get Started */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={user ? "/dashboard" : "/auth"}>
          <Button className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {user ? (
              <>
                <LayoutDashboard className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold">Dashboard</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold">Começar Agora</span>
              </>
            )}
          </Button>
        </Link>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ThemeToggle />
      </motion.div>
    </div>
  );
};
