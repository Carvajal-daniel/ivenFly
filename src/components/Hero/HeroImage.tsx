"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const heroImage = "/assets/hero-ai-business.jpg";

const HeroImage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-elegant">
        <Image
          src={heroImage}
          alt="Visualização de Crescimento de Negócios com IA"
          className="w-full h-auto object-cover"
          height={500}
          width={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      {/* Card Flutuante */}
      <motion.div
        className="absolute -bottom-6 -left-6 bg-card p-6 animate-float rounded-xl shadow-card border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Crescimento Potencial</div>
            <div className="text-2xl font-bold text-foreground">+247%</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroImage;
