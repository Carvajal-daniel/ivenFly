"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { DesktopNavigation } from "./DesktopNavigation";
import { DesktopButtons } from "./DesktopButtons";
import { MobileNavigation } from "./MobileNavigation";
import Link from "next/link";
import imageLogo from "../../../public/assets/logo.png";
import Image from "next/image";

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Link href="/" className="flex items-center ">
      <Image
        className=" -mr-8 -ml-[20%]"
        width={100}
        height={100}
        src={imageLogo}
        alt="Logo"
      />
      <span className="text-2xl font-bold text-foreground/80">Uplys</span>
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
        scrolled ? "border-b border-border/50" : ""
      }`}
    >
      <div className="container mx-auto px-2 py-1 flex items-center justify-between">
        <Logo />
        <DesktopNavigation />
        <DesktopButtons />
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}  aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-black/80"
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
