"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  ctaLabel?: string;
};

export default function ErrorDialog({
  open,
  onClose,
  title = "Atenção",
  message,
  ctaLabel = "Entendido",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border border-red-200/50 bg-white/95 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(239,68,68,0.5)]">
        {/* Barra lateral animada */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-red-500 via-red-600 to-orange-500">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent animate-pulse"></div>
        </div>

        {/* Grid de fundo sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(239 68 68) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative px-8 py-8">
          {/* Header com ícone flutuante */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative shrink-0 mt-1">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-500/30 rounded-2xl blur-xl animate-pulse"></div>
              
              {/* Ícone container */}
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-3 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                <AlertTriangle className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              
              {/* Partículas decorativas */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
            </div>

            <div className="flex-1 pt-1">
              <DialogHeader className="space-y-3 text-left">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                  {title}
                </DialogTitle>
                <DialogDescription className="text-base text-gray-600 leading-relaxed">
                  {message}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Linha divisória decorativa */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-red-200 to-transparent mb-6"></div>

          {/* Footer */}
          <DialogFooter>
            <Button 
              onClick={onClose} 
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">{ctaLabel}</span>
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Button>
          </DialogFooter>
        </div>

        {/* Elementos flutuantes decorativos */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-8 right-12 w-24 h-24 bg-orange-500/5 rounded-full blur-xl"></div>
      </DialogContent>
    </Dialog>
  );
}