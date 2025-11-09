/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { InsightCard } from "@/lib/mockData";

interface InsightsGridProps {
  insights: InsightCard[];
}

export function InsightsGrid({ insights }: InsightsGridProps) {
  const renderInsightContent = (insight: InsightCard) => {
    switch (insight.type) {
      case "chart":
        return (
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insight.data}>
                <XAxis
                  dataKey="hour"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis hide />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case "list":
        return (
          <div className="space-y-3">
            {insight.data.slice(0, 4).map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.bookings} reservas
                  </p>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.revenue)}
                </p>
              </div>
            ))}
          </div>
        );

      case "progress":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{insight.value}%</p>
              {insight.trend && (
                <Badge
                  variant={insight.trend > 0 ? "default" : "secondary"}
                  className={cn(
                    "gap-1",
                    insight.trend > 0
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {insight.trend > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(insight.trend)}%
                </Badge>
              )}
            </div>
            <Progress
              value={insight.value as number}
              className="h-3"
            />
            <p className="text-sm text-muted-foreground">{insight.subtitle}</p>
          </div>
        );

      case "stat":
        return (
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <p className="text-4xl font-bold">{insight.value}</p>
              {insight.trend && (
                <Badge
                  variant="default"
                  className="bg-primary/10 text-primary gap-1"
                >
                  <TrendingUp className="h-3 w-3" />
                  +{insight.trend}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{insight.subtitle}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid gap-4 md:grid-cols-2"
    >
      {insights.map((insight, index) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {insight.title}
              </CardTitle>
              {insight.subtitle && insight.type !== "progress" && (
                <p className="text-xs text-muted-foreground">{insight.subtitle}</p>
              )}
            </CardHeader>
            <CardContent>{renderInsightContent(insight)}</CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
