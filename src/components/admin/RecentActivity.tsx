import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  { user: "John Doe", action: "completed a task", time: "2 min ago" },
  { user: "Jane Smith", action: "uploaded a file", time: "15 min ago" },
  { user: "Mike Johnson", action: "created a new project", time: "1 hour ago" },
  { user: "Sarah Wilson", action: "left a comment", time: "2 hours ago" },
];

export default function RecentActivity() {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "500ms" }}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.user.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
