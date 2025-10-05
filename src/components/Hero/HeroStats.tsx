"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2.5M+", label: "Relatórios Gerados" },
  { value: "12+", label: "Setores Comparados" },
  { value: "97%", label: "Sugestões Aprovadas" },
];

const HeroStats = () => {
  return (
    <motion.div
      className="flex items-center space-x-8 pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col max-w-md items-center ">
          <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;
