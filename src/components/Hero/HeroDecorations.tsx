"use client";

import GradientBg from "@/lib/gradient";
import { motion } from "framer-motion";

const HeroDecorations = () => {
  return (
    <>
      {/* Polígono Colorido */}
   <GradientBg className={`hidden md:block absolute md:z-50 -top-20 -left-20 md:-top-5 md:-left-8  w-[30rem] h-[35rem] bg-gradient-to-br from-blue-700 via-pink-500 to-primary rounded-full blur-[5rem]`}
      />  

      {/* Bolinhas Flutuantes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-4 h-4 animate-pulse bg-gradient-to-br from-blue-700 to-primary  rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-[20rem] left-[40rem] w-6 h-6 animate-pulse bg-gradient-to-br from-blue-700 to-primary rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </>
  );
};

export default HeroDecorations;
