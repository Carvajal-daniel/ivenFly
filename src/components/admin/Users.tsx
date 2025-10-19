
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager", status: "active" },
  ];

  return (
    <div>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Users</h2>
            <p className="text-muted-foreground mt-1">Manage user accounts and permissions.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Add New User
          </Button>
        </div>

        <Card className="animate-fade-in border-border" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
          <CardHeader>
            <CardTitle className="text-foreground">User List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user, index) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-all duration-200 hover:shadow-sm"
                  style={{ 
                    animationDelay: `${(index + 2) * 100}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                    <Badge variant="outline">{user.role}</Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
