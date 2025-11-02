import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessMessageProps {
    businessName: string;
    onClose: () => void;
}

export function SuccessMessage({ businessName, onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
      <Card className="max-w-md w-full shadow-2xl border-2 border-border/40 dark:border-border/20 bg-background animate-in zoom-in slide-in-from-bottom-4 duration-500">
        <CardContent className="pt-8 pb-8 px-6 text-center space-y-8">
          {/* Icon with Glow Effect */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-primary/30 dark:bg-primary/40 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full blur-xl"></div>
              
              {/* Icon Container */}
              <div className="relative bg-primary/10 dark:bg-primary/20 rounded-full p-5 border-2 border-primary/20 dark:border-primary/30">
                <CheckCircle2 className="h-16 w-16 text-primary dark:text-primary" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Title and Description */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <h2 className="text-3xl font-bold text-foreground dark:text-white">
                Cadastro Concluído!
              </h2>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <p className="text-base text-muted-foreground dark:text-gray-400 leading-relaxed">
              O negócio{" "}
              <span className="font-bold text-foreground dark:text-white bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded">
                {businessName}
              </span>{" "}
              foi cadastrado com sucesso!
            </p>
          </div>

          {/* Next Steps Card */}
          <div className="bg-muted/50 dark:bg-muted/30 backdrop-blur rounded-xl p-5 space-y-3 border-2 border-border/40 dark:border-border/20">
            <p className="text-sm font-semibold text-foreground dark:text-white flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Próximos passos
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            </p>
            <ul className="text-sm text-muted-foreground dark:text-gray-400 space-y-2.5 text-left">
              <li className="flex items-start gap-3 group">
                <span className="text-primary dark:text-primary mt-0.5 font-bold group-hover:scale-110 transition-transform">✓</span>
                <span className="group-hover:text-foreground dark:group-hover:text-white transition-colors">
                  Seus dados foram salvos com segurança
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-primary dark:text-primary mt-0.5 font-bold group-hover:scale-110 transition-transform">✓</span>
                <span className="group-hover:text-foreground dark:group-hover:text-white transition-colors">
                  Você receberá relatórios conforme configurado
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-primary dark:text-primary mt-0.5 font-bold group-hover:scale-110 transition-transform">✓</span>
                <span className="group-hover:text-foreground dark:group-hover:text-white transition-colors">
                  Acesse o painel para gerenciar seu negócio
                </span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onClose} 
            className="w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 shadow-lg hover:shadow-xl dark:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            Entendi, Obrigado!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}