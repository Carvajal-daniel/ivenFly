import { motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  XCircle,
  Star,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Virtuoso } from "react-virtuoso";
import type { ActivityItem } from "@/lib/mockData";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const activityIcons = {
  booking: Calendar,
  payment: CreditCard,
  cancellation: XCircle,
  review: Star,
  message: MessageCircle,
};

const activityColors = {
  booking: "text-primary bg-primary/10",
  payment: "text-chart-2 bg-chart-2/10",
  cancellation: "text-destructive bg-destructive/10",
  review: "text-chart-5 bg-chart-5/10",
  message: "text-chart-3 bg-chart-3/10",
};

function ActivityItemComponent({ item, index }: { item: ActivityItem; index: number }) {
  const Icon = activityIcons[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-start gap-4 p-4 rounded-lg hover:bg-accent/5 transition-colors cursor-pointer"
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
          activityColors[item.type]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-medium text-sm">{item.title}</p>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {item.time}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>

        <div className="flex items-center gap-3">
          {item.meta.user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-muted">
                  {item.meta.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{item.meta.user}</span>
            </div>
          )}

          {item.meta.value !== undefined && (
            <Badge variant="secondary" className="text-xs">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.meta.value)}
            </Badge>
          )}

          {item.meta.rating !== undefined && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Star className="h-3 w-3 fill-current" />
              {item.meta.rating}
            </Badge>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="lg"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-border shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-semibold">Atividade Recente</CardTitle>
          <Button variant="outline" size="sm">
            Ver Tudo
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto">
            <Virtuoso
              style={{ height: "500px" }}
              data={activities}
              itemContent={(index, item) => (
                <ActivityItemComponent item={item} index={index} />
              )}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
