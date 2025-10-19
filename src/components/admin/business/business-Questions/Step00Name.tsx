// src/components/business-registration/Step00Name.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionStepProps } from "./QuestionStep";

const Step00Name = ({ formData, updateField }: QuestionStepProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="name" className="text-lg font-semibold">
        Qual é o nome do seu negócio? *
      </Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        placeholder="Ex: Minha Empresa Ltda"
        className="text-lg py-6"
        autoFocus
      />
    </div>
  );
};

export default Step00Name;