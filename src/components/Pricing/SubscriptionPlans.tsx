"use client";

import { PlanCard } from "./PlanCard";
import { PlansHeader } from "./PlansHeader";
import { GuaranteesAndDemo } from "./GuaranteesAndDemo";
import {
  BarChart3,
  Brain,
  TrendingUp,
  Target,
  Database,
  Users,
  Shield,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = {
  essencial: [
    { icon: BarChart3, text: "Análise básica de 3 fontes de dados" },
    { icon: Brain, text: "5 insights de IA por mês" },
    { icon: TrendingUp, text: "Relatórios semanais automáticos" },
    { icon: Target, text: "Dashboard executivo" },
    { icon: Database, text: "Armazenamento de 12 meses" },
  ],
  pro: [
    { icon: Database, text: "Análise ilimitada de fontes de dados" },
    { icon: Brain, text: "Insights de IA ilimitados e personalizados" },
    { icon: TrendingUp, text: "Relatórios em tempo real" },
    { icon: Users, text: "Colaboração em equipe avançada" },
    { icon: Target, text: "Previsões de mercado com ML" },
    { icon: Shield, text: "Segurança empresarial premium" },
  ],
};

// Variantes de animação
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // Bezier curve
  },
};

export const SubscriptionPlans = () => (
  <section className="relative py-16 px-4 overflow-hidden">
    <div className="absolute inset-0 gradient-hero opacity-30" />
    <div className="container mx-auto max-w-6xl relative z-10">
      <PlansHeader />

      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="h-full">
          <PlanCard
            title="Essencial"
            description="Para pequenas empresas"
            price="R$ 99,99"
            features={features.essencial}
            buttonText="Começar Agora"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <PlanCard
            highlight
            title="Pro Business"
            description="Para empresas em crescimento acelerado"
            price="R$ 149,99"
            features={features.pro}
            buttonText="Acelerar Crescimento"
          />
        </motion.div>
      </motion.div>

      <GuaranteesAndDemo />
    </div>
  </section>
);
