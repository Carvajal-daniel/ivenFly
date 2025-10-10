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
      <GradientBg
        className={`hidden md:block absolute top-60 -right-[60rem] w-[30rem] h-[40rem] bg-gradient-to-br from-blue-100 to-primary dark:from-blue-950/30 dark:to-primary/30 rounded-full blur-[9rem]`}
      />

      <Card
        className={`grid grid-rows-[auto,1fr,auto] h-full rounded-xl backdrop-blur-sm transition-all duration-300
        ${
          highlight
            ? "shadow-lg border-2 border-primary/20 dark:border-primary/40 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20"
            : "shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80"
        }`}
      >
        {/* Cabeçalho */}
        <CardHeader className="text-center pb-3 pt-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary dark:text-blue-500">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </CardDescription>

          <div className="mt-5">
            <span
              className={`text-3xl md:text-4xl font-extrabold tracking-tight
              ${
                highlight
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {price}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400"> /mês</span>
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
              />
            ))}
          </div>
        </CardContent>

        {/* Rodapé (sempre fixo embaixo) */}
        <CardFooter className="pt-6 px-6 pb-5 mt-auto">
          <Button
            className={`w-full h-11 text-sm font-semibold rounded-xl transition-all duration-300
            ${
              highlight
                ? "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white shadow-md hover:shadow-lg"
                : "bg-primary hover:bg-primary/90 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};