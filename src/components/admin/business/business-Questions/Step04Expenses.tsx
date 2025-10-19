// src/components/business-registration/Step04Expenses.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionStepProps } from "./QuestionStep";

const Step04Expenses = ({ formData, updateField }: QuestionStepProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="expenses" className="text-lg font-semibold">
        Quais são as despesas mensais médias? (opcional)
      </Label>
      <p className="text-sm text-muted-foreground">
        Esta informação é opcional e nos ajuda a entender melhor seu negócio
      </p>
      <Input
        id="expenses"
        type="number"
        value={formData.expenses || ""}
        onChange={(e) =>
          updateField("expenses", e.target.value ? Number(e.target.value) : undefined)
        }
        placeholder="Ex: 30000"
        className="text-lg py-6"
        autoFocus
      />
    </div>
  );
};

export default Step04Expenses;