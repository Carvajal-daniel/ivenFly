// MobileNavigation.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { useCurrentUser } from "@/constantes/api/useCurrentUser";
import { LogIn, LayoutDashboard, Sparkles, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Solutions", href: "#solutions" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

interface MobileProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const LoadingSkeleton = () => (
  <div className="md:hidden flex flex-col items-center justify-center p-4 space-y-6 py-10">
    <Skeleton className="h-6 w-40 rounded-lg" />
    <Skeleton className="h-6 w-36 rounded-lg" />
    <Skeleton className="h-6 w-44 rounded-lg" />
    <div className="flex flex-col items-center space-y-4 pt-2">
      <Skeleton className="h-10 w-48 rounded-lg" />
      <Skeleton className="h-10 w-48 rounded-lg" />
      <Skeleton className="h-10 w-12 rounded-lg" />
    </div>
  </div>
);

export const MobileNavigation: React.FC<MobileProps> = ({ isOpen, setIsOpen }) => {
  const { user, loading } = useCurrentUser();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/70 backdrop-blur-md border border-border/20 rounded-b-lg shadow-lg overflow-hidden"
        >
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 space-y-10 py-10">
              {/* Links de navegação âncora */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-2xl transition-colors font-medium"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, delay: 0.05 * index }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Bloco de ações / usuário */}
              <div className="flex flex-col items-center space-y-4 pt-4 w-full">
                {/* Saudação ou botão de login */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  className="w-full flex justify-center"
                >
                  {user ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800 shadow-md">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-sm text-black/70 dark:text-blue-400">
                        Olá, {user.name ?? "Usuário"}
                      </span>
                    </div>
                  ) : (
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-foreground/70 hover:cursor-pointer border shadow-elegant py-5 px-20"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                  )}
                </motion.div>

                {/* CTA principal: Dashboard (se logado) ou Começar Agora */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, delay: 0.45 }}
                  className="w-full flex justify-center"
                >
                  <Link
                    href={user ? "/dashboard" : "/auth"}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="bg-primary hover:cursor-pointer border-0 shadow-elegant py-5 px-20">
                      {user ? (
                        <>
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Começar agora
                        </>
                      )}
                    </Button>
                  </Link>
                </motion.div>

                {/* Toggle de tema */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: 0.6 }}
                >
                  <ThemeToggle />
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
