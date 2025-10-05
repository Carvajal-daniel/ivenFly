import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights and performance metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Traffic Overview
            </CardTitle>
            <CardDescription>Monthly visitor statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[65, 78, 90, 45, 88, 92, 75, 68, 85, 72, 95, 88].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-primary rounded-t-md transition-all duration-500 hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Growth Metrics
            </CardTitle>
            <CardDescription>Year-over-year comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Q1 2024", value: "+145%", color: "bg-blue-500" },
                { label: "Q2 2024", value: "+198%", color: "bg-purple-500" },
                { label: "Q3 2024", value: "+234%", color: "bg-pink-500" },
                { label: "Q4 2024", value: "+312%", color: "bg-yellow-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              User Distribution
            </CardTitle>
            <CardDescription>By device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Desktop", percent: 58, color: "bg-blue-600" },
                { name: "Mobile", percent: 32, color: "bg-purple-600" },
                { name: "Tablet", percent: 10, color: "bg-pink-600" },
              ].map((device) => (
                <div key={device.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{device.name}</span>
                    <span className="font-semibold">{device.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full ${device.color} transition-all duration-500`}
                      style={{ width: `${device.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real-time Activity
            </CardTitle>
            <CardDescription>Live user engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                  1,247
                </div>
                <p className="text-sm text-muted-foreground mt-2">Active users right now</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-xs text-muted-foreground">New</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1,158</div>
                  <div className="text-xs text-muted-foreground">Returning</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.2m</div>
                  <div className="text-xs text-muted-foreground">Avg. Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}