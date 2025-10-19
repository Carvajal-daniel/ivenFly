// src/components/business-registration/Step06Services.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { QuestionStepProps } from "./QuestionStep";

const servicesByNiche: Record<string, string[]> = {
  barbearia: ["Corte de Cabelo", "Barba", "Sobrancelha", "Pigmentação", "Luzes"],
  salao_beleza: ["Corte Feminino", "Escova", "Hidratação", "Coloração", "Manicure", "Pedicure", "Depilação"],
  loja_roupas: ["Roupas Masculinas", "Roupas Femininas", "Roupas Infantis", "Acessórios", "Calçados"],
  loja_eletronicos: ["Celulares", "Computadores", "TVs", "Áudio", "Acessórios", "Assistência Técnica"],
  lanchonete: ["Lanches", "Sucos", "Bebidas", "Porções", "Salgados"],
  acaiteria: ["Açaí", "Sorvetes", "Sucos", "Vitaminas", "Tapioca"],
};

const Step06Services = ({ formData, updateField }: QuestionStepProps) => {
  const [newService, setNewService] = useState("");
  const suggestedServices = servicesByNiche[formData.niche] || [];

  const handleServiceToggle = (service: string) => {
    const current = formData.services;
    if (current.includes(service)) {
      updateField("services", current.filter((s) => s !== service));
    } else {
      updateField("services", [...current, service]);
    }
  };
  
  const handleAddService = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newService.trim()) {
      e.preventDefault();
      if (!formData.services.includes(newService.trim())) {
        updateField("services", [...formData.services, newService.trim()]);
        setNewService("");
      } else {
        toast.error("Este serviço já foi adicionado");
      }
    }
  };

  const removeService = (service: string) => {
    updateField("services", formData.services.filter((s) => s !== service));
  };


  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Quais serviços você oferece? *
      </Label>
      
      {suggestedServices.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">Sugestões baseadas no seu negócio:</p>
          <div className="grid grid-cols-2 gap-3">
            {suggestedServices.map((service) => (
              <label
                key={service}
                htmlFor={`service-${service}`}
                className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <Checkbox
                  id={`service-${service}`}
                  checked={formData.services.includes(service)}
                  onCheckedChange={() => handleServiceToggle(service)}
                />
                <span className="flex-1 font-normal">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="newService" className="text-sm font-medium">
          Adicionar serviço personalizado:
        </Label>
        <Input
          id="newService"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          onKeyDown={handleAddService}
          placeholder="Digite o serviço e pressione Enter"
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">Pressione Enter para adicionar</p>
      </div>

      {formData.services.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Serviços adicionados:</Label>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-sm"
              >
                <span>{service}</span>
                <button
                  onClick={() => removeService(service)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step06Services;