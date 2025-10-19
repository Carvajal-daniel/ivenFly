// src/components/business-registration/Step11Challenges.tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuestionStepProps } from "./QuestionStep";

const Step11Challenges = ({ formData, updateField }: QuestionStepProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="challenges" className="text-lg font-semibold">
        Quais são os principais desafios do seu negócio? *
      </Label>
      <Textarea
        id="challenges"
        value={formData.challenges}
        onChange={(e) => updateField("challenges", e.target.value)}
        placeholder="Ex: Gestão de tempo, captação de clientes, etc."
        className="text-base min-h-32"
        autoFocus
      />
    </div>
  );
};

export default Step11Challenges;