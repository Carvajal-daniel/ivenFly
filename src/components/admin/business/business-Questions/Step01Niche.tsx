// src/components/business-registration/Step01Niche.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionStepProps } from "./QuestionStep";

const nicheOptions = [
  { value: "barbearia", label: "Barbearia" },
  { value: "salao_beleza", label: "Salão de Beleza" },
  { value: "loja_roupas", label: "Loja de Roupas" },
  { value: "loja_eletronicos", label: "Loja de Eletrônicos" },
  { value: "lanchonete", label: "Lanchonete" },
  { value: "acaiteria", label: "Açaiteria" },
];

const Step01Niche = ({ formData, updateField }: QuestionStepProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Qual é o seu tipo de negócio? *
      </Label>
      <RadioGroup
        value={formData.niche}
        onValueChange={(value) => {
          updateField("niche", value);
          updateField("services", []);
        }}
      >
        {nicheOptions.map((option) => (
          <label
            key={option.value}
            htmlFor={`niche-${option.value}`}
            className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem 
              value={option.value} 
              id={`niche-${option.value}`}
            />
            <span className="flex-1 font-normal">
              {option.label}
            </span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step01Niche;