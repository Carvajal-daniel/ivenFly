// src/components/business-registration/Step05Prices.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionStepProps } from "./QuestionStep";

const Step05Prices = ({ formData, updateField }: QuestionStepProps) => {
  const calculateAvgPrice = (min?: number, max?: number) => {
    if (min !== undefined && max !== undefined && min > 0 && max > 0) {
      const avg = (min + max) / 2;
      updateField("avgServicePrice", avg);
    } else {
      updateField("avgServicePrice", undefined);
    }
  };
  
  const isMinMaxValid = formData.minServicePrice !== undefined && formData.minServicePrice > 0 &&
                        formData.maxServicePrice !== undefined && formData.maxServicePrice > 0;

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Qual é a faixa de preço dos seus serviços/produtos? *
      </Label>
      <p className="text-sm text-muted-foreground">
        Informe o valor mínimo e máximo para calcularmos a média
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minServicePrice" className="text-sm font-medium">
            Preço Mínimo (R$)
          </Label>
          <Input
            id="minServicePrice"
            type="number"
            value={formData.minServicePrice || ""}
            onChange={(e) => {
              const min = e.target.value ? Number(e.target.value) : undefined;
              updateField("minServicePrice", min);
              calculateAvgPrice(min, formData.maxServicePrice);
            }}
            placeholder="Ex: 50"
            className="text-base"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxServicePrice" className="text-sm font-medium">
            Preço Máximo (R$)
          </Label>
          <Input
            id="maxServicePrice"
            type="number"
            value={formData.maxServicePrice || ""}
            onChange={(e) => {
              const max = e.target.value ? Number(e.target.value) : undefined;
              updateField("maxServicePrice", max);
              calculateAvgPrice(formData.minServicePrice, max);
            }}
            placeholder="Ex: 200"
            className="text-base"
            min="0"
          />
        </div>
      </div>

      {!isMinMaxValid && (
        <p className="text-sm text-destructive font-medium">
            * Preços Mínimo e Máximo são obrigatórios e devem ser maiores que zero.
        </p>
      )}

      {formData.avgServicePrice !== undefined && isMinMaxValid && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in">
          <p className="text-sm font-medium text-primary">
            Preço Médio Calculado: R$ {formData.avgServicePrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Step05Prices;