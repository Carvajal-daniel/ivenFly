"use client";

import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroDecorations from "./HeroDecorations";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroTitle from "./HeroTitle";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Gradientes e elementos flutuantes */}
      <HeroDecorations />

      {/* Overlay sutil para melhor contraste no dark mode */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo */}
          <div className="space-y-8 flex flex-col md:block items-center">
            <HeroBadge />
            <HeroTitle />
            <HeroButtons />
            <HeroStats />
          </div>
          <HeroImage />
        </div>
      </div>

      {/* Glow effect bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Hero;