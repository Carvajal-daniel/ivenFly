"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { DesktopNavigation } from "./DesktopNavigation";
import { DesktopButtons } from "./DesktopButtons";
import { MobileNavigation } from "./MobileNavigation";
import Link from "next/link";
import Image from "next/image";
import logoSymbol from "../../../public/assets/logo2.png"; 

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link href="/" className="flex items-center gap-2 -ml-2 md:-ml-4">
      <Image
        src={logoSymbol}
        alt="Uplys logo"
        width={0}
        height={0}
        className="w-18 h-16 -mr-6 mb-1 md:w-20 md:h-18 object-contain"
        priority
      />
      <span className="text-2xl md:text-[1.5rem] font-medium md:font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black/80 dark:hover:text-white/80">
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800 shadow-lg"
          : "bg-white/30 dark:bg-gray-950/30 border-gray-200/50 dark:border-gray-800/50 shadow-md"
      } border-b backdrop-blur-xl`}
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
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-3 text-gray-800 dark:text-gray-200"
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