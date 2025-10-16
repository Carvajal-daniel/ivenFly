import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  delay = 0,
}: MetricCardProps) {
  return (
    <Card 
      className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-bold mb-2">{value}</h3>
            <p className={`text-sm font-medium ${trend === "up" ? "text-primary" : "text-destructive"}`}>
              {change}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
