"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeatureItem } from "./FeatureItem";
import GradientBg from "@/lib/gradient";
import type { LucideIcon } from "lucide-react";

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  features: { icon: LucideIcon; text: string }[];
  highlight?: boolean;
  buttonText?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  description,
  price,
  features,
  highlight = false,
  buttonText,
}) => {
  return (
    <>
<GradientBg className={`hidden md:block absolute md:z-50 top-3 -right-[40rem]  w-[30rem] h-[30rem] bg-gradient-to-br from-blue-300 via-blue-300 to-grandient-primary rounded-tr-full blur-[4rem] animate-float`}
      />  
    <Card
      className={`grid grid-rows-[auto,1fr,auto] h-full rounded-xl backdrop-blur-sm transition-all duration-300
        ${highlight
          ? "shadow-lg border-primary/10 border bg-gradient-to-br from-card via-card to-primary/10"
          : "shadow-md border border-border/50 bg-card"}`}
          >
      
      {/* Cabeçalho */}
      <CardHeader className="text-center pb-3 pt-2">
        <CardTitle className="text-2xl md:text-3xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>

        <div className="mt-5">
          <span
            className={`text-3xl md:text-4xl font-extrabold tracking-tight
              ${highlight
                ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                : "text-primary"}`}
                >
            {price}
          </span>
          <span className="text-sm text-muted-foreground"> /mês</span>
        </div>
      </CardHeader>

      {/* Features (ocupa o espaço flexível do meio) */}
      <CardContent className="flex flex-col justify-between space-y-5 px-6">
        <div className="flex flex-col gap-4">
          {features.map((feature, i) => (
            <FeatureItem
            key={i}
            icon={feature.icon}
            text={feature.text}
            gradient={highlight}
            />
          ))}
        </div>
      </CardContent>

      {/* Rodapé (sempre fixo embaixo) */}
      <CardFooter className="pt-6 px-6 pb-5 mt-auto">
        <Button
          className={`w-full h-11 text-sm font-semibold rounded-xl transition-all duration-300
            ${highlight
              ? "gradient-primary text-primary-foreground shadow-md"
              : "bg-blue-600 text-white"}`}
              >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
          </>
  );
};
