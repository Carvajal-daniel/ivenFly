"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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

export const MobileNavigation: React.FC<MobileProps> = ({ isOpen, setIsOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="md:hidden mt-4 bg-background/70 backdrop-blur-md border border-border rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              {item.name}
            </motion.a>
          ))}
          <div className="flex flex-col space-y-2 pt-4">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Login</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button className="gradient-primary border-0 shadow-elegant" onClick={() => setIsOpen(false)}>Get Started</Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
