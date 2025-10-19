// src/components/business-registration/Step03Revenue.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionStepProps } from "./QuestionStep";

const Step03Revenue = ({ formData, updateField }: QuestionStepProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="revenue" className="text-lg font-semibold">
        Qual é a receita mensal média? (opcional)
      </Label>
      <p className="text-sm text-muted-foreground">
        Esta informação é opcional e nos ajuda a entender melhor seu negócio
      </p>
      <Input
        id="revenue"
        type="number"
        value={formData.revenue || ""}
        onChange={(e) =>
          updateField("revenue", e.target.value ? Number(e.target.value) : undefined)
        }
        placeholder="Ex: 50000"
        className="text-lg py-6"
        autoFocus
      />
    </div>
  );
};

export default Step03Revenue;