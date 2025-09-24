"use client";

import { Shield, Check, Headset, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export const GuaranteesAndDemo = () => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3 }}
    variants={fadeUp}
    className="text-center mt-12 space-y-6"
  >
    <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground flex-wrap">
    
      <div className="flex items-center gap-2">
        <Check className="w-3.5 h-3.5 text-primary" />
        <span>Sem compromisso</span>
      </div>
      <div className="flex items-center gap-2">
        <Headset className="w-3.5 h-3.5 text-primary" />
        <span>Suporte especializado</span>
      </div>
    </div>

  
  </motion.div>
);
