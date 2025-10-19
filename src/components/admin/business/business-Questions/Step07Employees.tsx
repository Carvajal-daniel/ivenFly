// src/components/business-registration/Step07Employees.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionStepProps } from "./QuestionStep";

const Step07Employees = ({ formData, updateField }: QuestionStepProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="employees" className="text-lg font-semibold">
        Quantos funcionários você tem? *
      </Label>
      <Input
        id="employees"
        type="number"
        value={formData.employees === undefined ? "" : formData.employees}
        onChange={(e) => {
            const value = e.target.value;
            updateField("employees", value === "" ? undefined : Number(value));
        }}
        placeholder="Ex: 10 (0 se for apenas você)"
        min="0"
        className="text-lg py-6"
        autoFocus
      />
    </div>
  );
};

export default Step07Employees;