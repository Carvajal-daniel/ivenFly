"use client";

import { motion } from "framer-motion";

const navItems = [
  { name: "Serviços", href: "#services" },
  { name: "Preços", href: "#pricing" },
  { name: "Soluções", href: "#solutions" },
  { name: "Sobre nos", href: "#about" },
  { name: "Contato", href: "#contact" },
];

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export const DesktopNavigation = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const headerOffset = 90; 
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = window.scrollY + elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          onClick={(e) => handleScroll(e, item.href)}
          className="
            text-black/80 text-[.9rem] dark:text-gray-200 
            hover:text-primary dark:hover:text-gray-400 
            transition-colors font-medium
          "
          custom={index}
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          {item.name}
        </motion.a>
      ))}
    </div>
  );
};
