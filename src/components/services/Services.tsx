"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Zap, BarChart3, Lightbulb, Rocket, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass: string;
}

const Services: React.FC = () => {
 const services: Service[] = [
  {
    icon: Brain,
    title: "Desenvolvimento de Estratégia em IA",
    description: "Estratégias de IA personalizadas de acordo com os objetivos e a posição de mercado do seu negócio.",
    colorClass: "text-purple-500", // Roxo
  },
  {
    icon: Target,
    title: "Otimização de Crescimento",
    description: "Abordagens orientadas por dados para otimizar cada etapa do seu funil de crescimento.",
    colorClass: "text-emerald-500", // Verde
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Otimize operações com soluções inteligentes de automação.",
    colorClass: "text-yellow-500", // Amarelo
  },
  {
    icon: BarChart3,
    title: "Análises de Performance",
    description: "Análises avançadas para medir e melhorar a performance do seu negócio.",
    colorClass: "text-blue-500", // Azul
  },
  {
    icon: Lightbulb,
    title: "Consultoria em Inovação",
    description: "Guie sua transformação digital com tecnologias de ponta.",
    colorClass: "text-orange-500", // Laranja
  },
  {
    icon: Rocket,
    title: "Aceleração de Escala",
    description: "Estratégias de escalabilidade rápida impulsionadas por IA e inteligência de mercado.",
    colorClass: "text-pink-500", // Rosa
  },
];


  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nossos Serviços</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-semibold mb-6">
            <span className="text-foreground">Soluções</span>
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">Completas de Crescimento</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Da estratégia à execução, oferecemos soluções de IA ponta a ponta que impulsionam o crescimento real do seu negócio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 ${service.colorClass}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
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
