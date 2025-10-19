// src/components/business-registration/Step02Address.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { QuestionStepProps } from "./QuestionStep";

const Step02Address = ({ formData, updateField }: QuestionStepProps) => {
  const [cepLoading, setCepLoading] = useState(false);

  const fetchAddress = async (cep: string) => {
    if (cep.length !== 8) return;

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      updateField("address", {
        ...formData.address, 
        cep: cep,
        logradouro: data.logradouro || "",
        complemento: data.complemento || "",
        bairro: data.bairro || "",
        localidade: data.localidade || "",
        uf: data.uf || "",
      });
      toast.success("Endereço encontrado!");
    } catch (error) {
      toast.error("Erro ao buscar CEP");
    } finally {
      setCepLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="cep" className="text-lg font-semibold">
        Qual é o endereço do seu negócio? *
      </Label>
      <div className="space-y-3">
        <div className="relative">
          <Label htmlFor="cep" className="text-sm font-medium">CEP *</Label>
          <Input
            id="cep"
            value={formData.address.cep}
            onChange={(e) => {
              const cep = e.target.value.replace(/\D/g, "");
              updateField("address", { ...formData.address, cep });
              if (cep.length === 8) {
                fetchAddress(cep);
              }
            }}
            placeholder="Digite o CEP (somente números)"
            className="text-lg py-6"
            maxLength={8}
            autoFocus
          />
          {cepLoading && (
            <Loader2 className="w-5 h-5 animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="numero" className="text-sm font-medium">Número *</Label>
          <Input
            id="numero"
            type="number" 
            value={formData.address.numero || ""}
            onChange={(e) => updateField("address", { ...formData.address, numero: e.target.value })}
            placeholder="Ex: 123"
            className="text-lg py-6"
          />
        </div>

        {formData.address.localidade && (
          <div className="p-4 rounded-lg bg-accent/30 space-y-2 animate-fade-in">
            <p className="text-sm font-medium">Endereço encontrado:</p>
            <p className="text-sm">
              <span className="font-semibold">{formData.address.cep}</span> - 
              {formData.address.logradouro && ` ${formData.address.logradouro}, `}
              <span className="font-semibold">{formData.address.numero || '[Número]'}</span>
            </p>
            <p className="text-sm font-semibold">
              {formData.address.bairro} - {formData.address.localidade} / {formData.address.uf}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step02Address;