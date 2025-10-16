import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface ClientInfoProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  memberSince: string;
  status: "active" | "inactive";
  plan: string;
}

export default function ClientInfo({
  name = "João Silva",
  email = "joao.silva@email.com",
  phone = "+55 11 98765-4321",
  location = "São Paulo, SP",
  memberSince = "Janeiro 2024",
  status = "active",
  plan = "Premium"
}: Partial<ClientInfoProps>) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "200ms" }}>
      <CardHeader>
        <CardTitle>Informações do Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={status === "active" ? "default" : "secondary"}>
                  {status === "active" ? "Ativo" : "Inativo"}
                </Badge>
                <Badge variant="outline">{plan}</Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Membro desde {memberSince}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
