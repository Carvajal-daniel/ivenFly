// src/components/business-registration/Step10SocialPlatforms.tsx
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionStepProps } from "./QuestionStep";

const socialPlatforms = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Twitter",
  "TikTok",
  "YouTube",
];

const Step10SocialPlatforms = ({ formData, updateField }: QuestionStepProps) => {

  if (!formData.usesSocialMedia) {
    return (
      <div className="space-y-3 text-center py-8">
        <p className="text-lg text-muted-foreground">
          Como você não usa redes sociais, vamos pular esta etapa.
        </p>
      </div>
    );
  }

  const handlePlatformToggle = (platform: string) => {
    const current = formData.socialPlatforms;
    if (current.includes(platform)) {
      updateField("socialPlatforms", current.filter((p) => p !== platform));
    } else {
      updateField("socialPlatforms", [...current, platform]);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Quais plataformas você utiliza? *
      </Label>
      <p className="text-sm text-muted-foreground">Selecione todas as opções aplicáveis</p>
      <div className="grid grid-cols-2 gap-3">
        {socialPlatforms.map((platform) => (
          <div
            key={platform}
            className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => handlePlatformToggle(platform)}
          >
            <Checkbox
              id={`platform-${platform}`}
              checked={formData.socialPlatforms.includes(platform)}
              onCheckedChange={() => handlePlatformToggle(platform)}
            />
            <Label
              htmlFor={`platform-${platform}`}
              className="cursor-pointer flex-1 font-normal"
            >
              {platform}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step10SocialPlatforms;