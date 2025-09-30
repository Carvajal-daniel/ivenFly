"use client";

import GradientBg from "@/lib/gradient";
import { motion } from "framer-motion";
import UplysVideo from "./info";

const HeroDecorations = () => {
  return (
    <>
      {/* Polígono Colorido */}
   <GradientBg className={`hidden md:block absolute md:bottom-[10%] md:-left-[2%] md:w-[35rem] md:h-[35rem] bg-gradient-to-br from-blue-700 rounded-lg blur-[5rem]`}
      />  

      {/* Bolinhas Flutuantes */}
      <motion.div
        className="hidden md:block absolute md:top-[20%] md:right-[2%] lg:right-[20%] w-4 h-4 animate-pulse bg-gradient-to-br from-blue-700 to-primary  rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.div
        className="hidden md:block absolute md:bottom-[10%] md:left-[23%] lg:bottom-[19%] lg:left-[21%] w-6 h-6 animate-pulse bg-gradient-to-br from-blue-700 to-primary rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </>
  );
};

export default HeroDecorations;
