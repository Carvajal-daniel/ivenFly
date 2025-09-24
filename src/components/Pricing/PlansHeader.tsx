"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export const PlansHeader = () => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    variants={fadeUp}
    className="text-center mb-14"
  >
    <div id="pricing" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-4 border border-primary/20">
      <Brain className="w-3.5 h-3.5" />
      Inteligência Artificial para Negócios
    </div>

    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
     <span className="gradient-primary bg-clip-text text-transparent">  Transforme Dados em Crescimento</span>
    </h1>

    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
      Nossa IA analisa seus dados de negócio e gera insights precisos para acelerar seu crescimento
    </p>
  </motion.div>
);
