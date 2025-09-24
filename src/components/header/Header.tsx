"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { DesktopNavigation } from "./DesktopNavigation";
import { DesktopButtons } from "./DesktopButtons";
import { MobileNavigation } from "./MobileNavigation";
import Link from "next/link";

const Logo = () => (
  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Link href="/" className="flex items-center">
      <span className="text-2xl font-semibold text-black">Iven</span>
      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">Fly</span>
      </div>
    </Link>
  </motion.div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-lg transition-colors">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <DesktopNavigation />
        <DesktopButtons />
       <button
  className="md:hidden p-2"
  onClick={() => setIsOpen(!isOpen)}
>
  <motion.div
    key={isOpen ? "close" : "menu"}
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </motion.div>
</button>

      </div>
      <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Header;
