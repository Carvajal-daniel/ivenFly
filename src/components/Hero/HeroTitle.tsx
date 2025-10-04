"use client";

import { motion } from "framer-motion";

const HeroTitle = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h1 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
        <span className="text-black/80">Transforme dados em decisões</span>
        <br />
        <span className=" bg-clip-text text-black/80">
          e leve sua empresa para o próximo nível
        </span>
      </h1>
      <p className="text-md md:text-lg text-center md:text-left text-muted-foreground max-w-2xl">
        O Uplys é seu parceiro inteligente: compara seu negócio com o mercado, 
        organiza suas finanças e sugere estratégias que realmente funcionam. 
        Mais crescimento, menos adivinhação.
      </p>
    </motion.div>
  );
};

export default HeroTitle;
