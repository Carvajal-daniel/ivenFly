"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroBadge = () => {
  return (
    <motion.div
      className="inline-flex items-center space-x-2 px-4 mb-3 py-2 bg-accent/40 rounded-full border border-accent/80"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Sparkles className="w-5 h-5 text-pink-300/80 dark:text-pink-300/30 animate-pulse " />
      <span className="text-sm font-medium text-gray-600/80 dark:text-slate-300">
        Inteligência que compara e impulsiona negócios
      </span>
    </motion.div>
  );
};

export default HeroBadge;
