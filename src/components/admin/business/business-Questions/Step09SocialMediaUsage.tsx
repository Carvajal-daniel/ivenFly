// src/components/business-registration/Step09SocialMediaUsage.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionStepProps } from "./QuestionStep";

const Step09SocialMediaUsage = ({ formData, updateField }: QuestionStepProps) => {

  const handleSocialMediaClick = (value: boolean) => {
    updateField("usesSocialMedia", value);
    if (value === false) {
      updateField("socialPlatforms", []);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Você usa redes sociais para o negócio? *
      </Label>
      <RadioGroup
        value={formData.usesSocialMedia ? "yes" : "no"}
        onValueChange={(value) => {
          handleSocialMediaClick(value === "yes");
        }}
      >
        <label
          htmlFor="social-yes"
          className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
        >
          <RadioGroupItem value="yes" id="social-yes" />
          <span className="flex-1 font-normal">
            Sim
          </span>
        </label>
        <label
          htmlFor="social-no"
          className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
        >
          <RadioGroupItem value="no" id="social-no" />
          <span className="flex-1 font-normal">
            Não
          </span>
        </label>
      </RadioGroup>
    </div>
  );
};

export default Step09SocialMediaUsage;