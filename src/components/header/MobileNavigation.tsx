"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";

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

export const MobileNavigation: React.FC<MobileProps> = ({
  isOpen,
  setIsOpen,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-background/70 backdrop-blur-md border border-border/20 rounded-b-lg shadow-lg overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center p-4 space-y-10 py-10">
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

          <div className="flex flex-col items-center space-y-4 pt-4">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, delay: 0.35 }}
            >
              <Link href="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-foreground/70 hover:cursor-pointer border shadow-elegant py-5 px-20"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, delay: 0.5 }}
            >
              <Link href="/auth">
                <Button
                  className="bg-primary hover:cursor-pointer border-0 shadow-elegant py-5 px-20"
                  onClick={() => setIsOpen(false)}
                >
                  Começar agora
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.65 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
