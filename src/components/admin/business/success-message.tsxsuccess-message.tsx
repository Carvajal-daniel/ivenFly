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
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
      <Card className="max-w-md w-full shadow-2xl border-0 bg-gradient-to-br from-white via-primary/5 to-white dark:from-gray-900 dark:via-primary/10 dark:to-gray-900 animate-in zoom-in slide-in-from-bottom-4 duration-500">
        <CardContent className="pt-8 pb-8 px-6 text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 rounded-full p-4">
                <CheckCircle2 className="h-16 w-16 text-primary drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Cadastro Concluído!
              </h2>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              O negócio <span className="font-bold text-foreground bg-primary/10 px-2 py-1 rounded">{businessName}</span> foi cadastrado com sucesso!
            </p>
          </div>

          <div className="bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur rounded-xl p-5 space-y-3 border border-primary/10">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              Próximos passos
              <span className="h-1 w-1 rounded-full bg-primary"></span>
            </p>
            <ul className="text-sm text-muted-foreground space-y-2.5 text-left">
              <li className="flex items-start gap-3 group">
                <span className="text-primary mt-0.5 font-bold group-hover:scale-110 transition-transform">✓</span>
                <span className="group-hover:text-foreground transition-colors">Seus dados foram salvos com segurança</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-primary mt-0.5 font-bold group-hover:scale-110 transition-transform">✓</span>
                <span className="group-hover:text-foreground transition-colors">Você receberá relatórios conforme configurado</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-primary mt-0.5 font-bold group-hover:scale-110 transition-transform">✓</span>
                <span className="group-hover:text-foreground transition-colors">Acesse o painel para gerenciar seu negócio</span>
              </li>
            </ul>
          </div>

          <Button 
            onClick={onClose} 
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            Entendi, Obrigado!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}