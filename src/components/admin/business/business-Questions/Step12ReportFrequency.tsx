// src/components/business-registration/Step12ReportFrequency.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionStepProps } from "./QuestionStep";

const reportFrequencies = [
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensal" },
  { value: "quarterly", label: "Trimestral" },
];

const Step12ReportFrequency = ({ formData, updateField }: QuestionStepProps) => {

  const handleReportFrequencyClick = (value: string) => {
    updateField("reportFrequency", value);
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Com que frequência você gostaria de receber relatórios? *
      </Label>
      <RadioGroup
        value={formData.reportFrequency}
        onValueChange={(value) => handleReportFrequencyClick(value)}
      >
        {reportFrequencies.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => handleReportFrequencyClick(option.value)}
          >
            <RadioGroupItem value={option.value} id={`report-${option.value}`} />
            <Label
              htmlFor={`report-${option.value}`}
              className="cursor-pointer flex-1 font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step12ReportFrequency;