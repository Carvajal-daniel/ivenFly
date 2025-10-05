"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { DesktopNavigation } from "./DesktopNavigation";
import { DesktopButtons } from "./DesktopButtons";
import { MobileNavigation } from "./MobileNavigation";
import Link from "next/link";
import Image from "next/image";
import logoSymbol from "../../../public/assets/uplyslogo.png"; 

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logoSymbol}
        alt="Uplys logo"
        width={500}
        height={500}
        className="w-20 h-14 -mr-5 mb-1 md:w-20 object-fit"
        priority
      />
      <span className="text-xl md:text-2xl font-semibold tracking-tight text-black/80 dark:text-white">
        Uplys
      </span>
    </Link>
  </motion.div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-xl transition-colors ${
        scrolled ? "border-b border-border/50 shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <DesktopNavigation />
          <DesktopButtons />
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-black/80 dark:text-white/80"
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
