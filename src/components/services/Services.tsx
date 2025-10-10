"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Zap, BarChart3, Lightbulb, Rocket, LucideIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass: string;
}

const Services: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services: Service[] = [
    {
      icon: Brain,
      title: "Desenvolvimento de Estratégia em IA",
      description: "Estratégias de IA personalizadas de acordo com os objetivos e a posição de mercado do seu negócio.",
      colorClass: "text-purple-500",
    },
    {
      icon: Target,
      title: "Otimização de Crescimento",
      description: "Abordagens orientadas por dados para otimizar cada etapa do seu funil de crescimento.",
      colorClass: "text-emerald-500",
    },
    {
      icon: Zap,
      title: "Automação de Processos",
      description: "Otimize operações com soluções inteligentes de automação.",
      colorClass: "text-yellow-500",
    },
    {
      icon: BarChart3,
      title: "Análises de Performance",
      description: "Análises avançadas para medir e melhorar a performance do seu negócio.",
      colorClass: "text-blue-500",
    },
    {
      icon: Lightbulb,
      title: "Consultoria em Inovação",
      description: "Guie sua transformação digital com tecnologias de ponta.",
      colorClass: "text-orange-500",
    },
    {
      icon: Rocket,
      title: "Aceleração de Escala",
      description: "Estratégias de escalabilidade rápida impulsionadas por IA e inteligência de mercado.",
      colorClass: "text-pink-500",
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">

          <div className="absolute top-2/5 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Círculo animado no fundo */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10"> 
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full border border-primary/20 dark:border-primary/30 mb-6">
            <Zap className="w-4 h-4 text-primary dark:text-blue-400" />
            <span className="text-sm font-medium text-primary dark:text-blue-400">Nossos Serviços</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl w-ful mx-auto lg:text-5xl font-semibold mb-6">
            <span className="text-gray-900 dark:text-white">Soluções</span>
            <br />
            <motion.span 
              className="text-3xl md:text-5xl text-[#47cebf] dark:text-[#5de0cf] bg-clip-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Completas de Crescimento
            </motion.span>
          </h2>
          
          <p className="text-md md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Da estratégia à execução, oferecemos soluções de IA ponta a ponta que impulsionam o crescimento real do seu negócio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 -mt-4 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card 
                  className="group relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 dark:hover:shadow-primary/40 hover:-translate-y-3 border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/60 bg-white dark:bg-gray-900/80 backdrop-blur-sm"
                >
                  
                  {/* Halo de Cor Sutil */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg blur-lg opacity-0`}
                    style={{ backgroundColor: service.colorClass.replace('text-', '') }}
                    animate={{
                      opacity: isHovered ? 0.2 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`w-6 h-6 ${service.colorClass} dark:brightness-125`} />
                      {isHovered && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                              transition={{
                                duration: 1,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            >
                              <Sparkles className={`w-4 h-4 ${service.colorClass} dark:brightness-125`} />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;