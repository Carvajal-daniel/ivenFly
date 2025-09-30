"use client";

import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroDecorations from "./HeroDecorations";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroTitle from "./HeroTitle";



const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradientes e elementos flutuantes */}
      <HeroDecorations />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo */}
          <div className="space-y-8">
            <HeroBadge />
            <HeroTitle />
            <HeroButtons />
            <HeroStats />
          </div>
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
