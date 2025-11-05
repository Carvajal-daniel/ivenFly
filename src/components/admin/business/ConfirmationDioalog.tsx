// ConfirmationDialog.tsx
import { CheckCircle2, Building2, MapPin, DollarSign, Sparkles, Clock, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FormValues } from "./form-schema"; 

// Tipos para as informações de resumo
interface ConfirmationDialogProps {
  showConfirm: boolean;
  setShowConfirm: (open: boolean) => void;
  confirmAndSubmit: () => void;
  formValues: FormValues;
  calculateAveragePrice: () => string;
}

// Definição do componente
export function ConfirmationDialog({
  showConfirm,
  setShowConfirm,
  confirmAndSubmit,
  formValues: v,
  calculateAveragePrice,
}: ConfirmationDialogProps) {

  // Lógica de resumo movida para dentro do componente
  const avg = Number(calculateAveragePrice());
  const amenityList = Object.entries(v.amenities || {})
    .filter(([_, val]) => (typeof val === "boolean" ? val : Boolean(val)))
    .map(([k]) => k);

  const sections = [
    {
      icon: Building2,
      title: "Informações Básicas",
      items: [
        { label: "Nome", value: v.name },
        { label: "Nicho", value: v.niche },
        { label: "Descrição", value: v.description },
        { label: "Tempo de operação", value: v.operatingYears },
      ],
    },
    {
      icon: MapPin,
      title: "Localização",
      items: [
        {
          label: "Endereço",
          value: [
            v.location?.street,
            v.location?.number,
            v.location?.city,
            v.location?.state,
            v.location?.cep,
          ]
            .filter(Boolean)
            .join(", "),
        },
        {
          label: "Capacidade",
          value: v.capacity ? `${v.capacity} pessoas` : "—",
        },
      ],
    },
    {
      icon: Briefcase,
      title: "Serviços & Equipe",
      items: [
        { label: "Serviços", value: `${v.services?.length || 0} selecionado(s)` },
        { label: "Funcionários", value: v.employees },
        {
          label: "Comodidades",
          value: amenityList.length ? amenityList.join(", ") : "Nenhuma",
        },
      ],
    },
    {
      icon: DollarSign,
      title: "Financeiro",
      items: [
        {
          label: "Preço mínimo",
          value: `R$ ${Number(v.minServicePrice || 0).toFixed(2)}`,
        },
        {
          label: "Preço máximo",
          value: `R$ ${Number(v.maxServicePrice || 0).toFixed(2)}`,
        },
        { label: "Preço médio", value: `R$ ${avg.toFixed(2)}` },
        { label: "Relatórios", value: v.reportFrequency },
      ],
    },
    {
      icon: Sparkles,
      title: "Marketing",
      items: [
        { label: "Redes sociais", value: v.usesSocialMedia ? "Sim" : "Não" },
        ...(v.usesSocialMedia
          ? [
              {
                label: "Plataformas",
                value: v.socialPlatforms?.join(", ") || "—",
              },
              { label: "Frequência", value: v.postingFrequency },
            ]
          : []),
        { label: "Desafios", value: v.challenges },
      ],
    },
    {
      icon: Clock,
      title: "Horários",
      items: [
        {
          label: "Funcionamento",
          value: v.businessHours?.length
            ? `${v.businessHours.length} período(s) configurado(s)`
            : "Não configurado",
        },
      ],
    },
  ];

  return (
    <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
      <DialogContent
        className="
          w-[calc(100vw-2rem)]
          sm:max-w-lg
          md:max-w-2xl
          lg:max-w-4xl
          xl:max-w-5xl
          p-0
          flex flex-col
          max-h-[85dvh]
        "
      >
        {/* Header */}
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Confirmar Cadastro
          </DialogTitle>
          <DialogDescription className="text-base">
            Revise as informações antes de finalizar o cadastro do negócio
          </DialogDescription>
        </DialogHeader>

        {/* CONTEÚDO rola; ocupa o espaço entre header e footer */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border-2 border-border/40 bg-muted/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base">{section.title}</h3>
                  </div>

                  <div className="space-y-2 ml-7">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between gap-4">
                        <span className="text-sm text-muted-foreground min-w-[120px]">
                          {item.label}:
                        </span>
                        <span className="text-sm font-medium text-right flex-1">
                          {item.value || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 border-t gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowConfirm(false)}
            className="h-11"
          >
            Voltar e Editar
          </Button>
          <Button
            type="button"
            onClick={confirmAndSubmit}
            className="h-11 bg-primary hover:bg-primary/90"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Confirmar Cadastro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}