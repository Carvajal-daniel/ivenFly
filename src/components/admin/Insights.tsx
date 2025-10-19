
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const Insights = () => {
  const insights = [
    {
      title: "Customer Growth",
      value: "+24.5%",
      description: "Increase in customer base this quarter",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Market Share",
      value: "18.3%",
      description: "Current market position",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Churn Rate",
      value: "-3.2%",
      description: "Decreased from last quarter",
      trend: "down",
      icon: TrendingDown,
    },
  ];

  return (
    <div>
      <div className="space-y-6 p-6">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Insights</h2>
          <p className="text-muted-foreground mt-1">Key metrics and business intelligence.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <Card 
              key={insight.title} 
              className="hover:shadow-md transition-all duration-200 hover:scale-[1.02] animate-fade-in border-border"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'backwards'
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {insight.title}
                </CardTitle>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  insight.trend === "up" 
                    ? "bg-green-500/10" 
                    : "bg-red-500/10"
                }`}>
                  <insight.icon className={`h-5 w-5 ${
                    insight.trend === "up" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{insight.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="animate-fade-in border-border" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <CardHeader>
            <CardTitle className="text-foreground">Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Análise detalhada dos dados será exibida aqui. Inclua gráficos e visualizações para melhor compreensão dos insights.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
