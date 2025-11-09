/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ServicesHeatmapProps {
  data: Array<{
    service: string;
    seg: number;
    ter: number;
    qua: number;
    qui: number;
    sex: number;
    sab: number;
    dom: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg shadow-elegant p-3"
    >
      <p className="text-sm font-medium mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-muted-foreground">{entry.dataKey}:</span>
          <span className="font-semibold">{entry.value} reservas</span>
        </div>
      ))}
    </motion.div>
  );
};

export function ServicesHeatmap({ data }: ServicesHeatmapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Reservas por Serviço e Dia
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Distribuição semanal por tipo de serviço
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="service"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground capitalize">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  dataKey="seg"
                  stackId="a"
                  fill="hsl(var(--chart-1))"
                  radius={[0, 0, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="ter"
                  stackId="a"
                  fill="hsl(var(--chart-2))"
                  radius={[0, 0, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="qua"
                  stackId="a"
                  fill="hsl(var(--chart-3))"
                  radius={[0, 0, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="qui"
                  stackId="a"
                  fill="hsl(var(--chart-4))"
                  radius={[0, 0, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="sex"
                  stackId="a"
                  fill="hsl(var(--chart-5))"
                  radius={[0, 0, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="sab"
                  stackId="a"
                  fill="hsl(var(--primary))"
                  radius={[0, 0, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="dom"
                  stackId="a"
                  fill="hsl(var(--chart-1))"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
