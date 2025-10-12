"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bghero from "../../../public/assets/bg-hero.png";

const HeroImage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Image
        src={bghero}
        width={1000}
        height={1000}
        alt="Hero Image"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default HeroImage;
