import { MetricCard } from "@/components/admin/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta! Aqui está o que está acontecendo com suas métricas hoje.
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Receita Total"
          value="$45,231"
          change="+20.1%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Usuários Ativos"
          value="2,350"
          change="+180"
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Taxa de Conversão"
          value="12.5%"
          change="+4.2%"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Engajamento"
          value="573"
          change="-2.1%"
          icon={Activity}
          trend="down"
        />
      </div>

      {/* Cards secundários */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-card">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Suas últimas métricas de desempenho e atualizações
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Item de Atividade {i}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Descrição da atividade {i}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {i}h atrás
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-card">
          <CardHeader>
            <CardTitle>Estatísticas Rápidas</CardTitle>
            <CardDescription>
              Principais indicadores de desempenho de forma rápida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Impressões", value: "45.2K", percent: 85 },
                { label: "Cliques", value: "12.8K", percent: 65 },
                { label: "Conversões", value: "1.2K", percent: 45 },
                { label: "Receita", value: "$45K", percent: 90 },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-medium">{stat.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
