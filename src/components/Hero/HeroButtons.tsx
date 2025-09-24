"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroButtons = () => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Button
        size="lg"
        className="gradient-primary border-0 shadow-elegant hover:shadow-glow transition-all duration-300 group"
      >
        Gerar meu Relatório Agora
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="hover:shadow-card transition-all duration-300 flex items-center"
      >
        <Play className="w-5 h-5 mr-2" />
        Assistir Demo
      </Button>
    </motion.div>
  );
};

export default HeroButtons;
