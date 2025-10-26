import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Componente de Sucesso (Mantido)
interface SuccessMessageProps {
    businessName: string;
    onClose: () => void;
}

export function SuccessMessage({ businessName, onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <Card className="max-w-md w-full shadow-2xl border-2 border-primary/20 animate-in zoom-in duration-300">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <CheckCircle2 className="h-20 w-20 text-primary relative z-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6" />
              Cadastro Concluído!
              <Sparkles className="h-6 w-6" />
            </h2>
            <p className="text-muted-foreground">
              O negócio <span className="font-semibold text-foreground">{businessName}</span> foi cadastrado com sucesso!
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium">Próximos passos:</p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Seus dados foram salvos com segurança</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Você receberá relatórios conforme configurado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Acesse o painel para gerenciar seu negócio</span>
              </li>
            </ul>
          </div>

          <Button 
            onClick={onClose} 
            className="w-full bg-primary hover:bg-primary/90 transition-all"
            size="lg"
          >
            Entendi, Obrigado!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}