import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { Metric } from "@/lib/mockData";

interface HeroMetricsProps {
  metrics: Metric[];
}

function CountUp({ end, format }: { end: number; format?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(val);
      case "percent":
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat("pt-BR").format(val);
    }
  };

  return <span>{formatValue(count)}</span>;
}

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox="0 0 100 30"
      className="w-full h-8 opacity-50"
      preserveAspectRatio="none"
    >
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points.join(" ")}
      />
    </svg>
  );
}

export function HeroMetrics({ metrics }: HeroMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group relative overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {metric.label}
                  </p>
                  <h3 className="text-3xl font-bold tracking-tight">
                    <CountUp end={metric.value} format={metric.format} />
                  </h3>
                </div>
                <Badge
                  variant={metric.trend === "up" ? "default" : "secondary"}
                  className={cn(
                    "gap-1",
                    metric.trend === "up"
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(metric.change)}%
                </Badge>
              </div>

              {metric.sparkline && (
                <div className="mb-3 text-primary">
                  <MiniSparkline data={metric.sparkline} />
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between group/btn text-muted-foreground hover:text-primary"
              >
                Ver detalhes
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
