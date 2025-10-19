// src/components/business-registration/Step08WorkingHours.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionStepProps } from "./QuestionStep";

const daysOfWeek = [
  { value: "monday", label: "Segunda-feira" },
  { value: "tuesday", label: "Terça-feira" },
  { value: "wednesday", label: "Quarta-feira" },
  { value: "thursday", label: "Quinta-feira" },
  { value: "friday", label: "Sexta-feira" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];

const Step08WorkingHours = ({ formData, updateField }: QuestionStepProps) => {

  const toggleDay = (day: string) => {
    const existingDay = formData.hours.find((h) => h.day === day);
    if (existingDay) {
      updateField("hours", formData.hours.filter((h) => h.day !== day));
    } else {
      updateField("hours", [...formData.hours, { day, start: "09:00", end: "18:00" }]);
    }
  };

  const updateDayHours = (day: string, field: "start" | "end", value: string) => {
    updateField(
      "hours",
      formData.hours.map((h) => (h.day === day ? { ...h, [field]: value } : h))
    );
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Quais são os dias e horários de funcionamento? *
      </Label>
      <p className="text-sm text-muted-foreground">
        Selecione os dias e defina os horários
      </p>

      <div className="space-y-3">
        {daysOfWeek.map((day) => {
          const dayHours = formData.hours.find((h) => h.day === day.value);
          const isSelected = !!dayHours;

          return (
            <div
              key={day.value}
              className="p-4 rounded-lg border hover:bg-accent/20 transition-colors space-y-3"
            >
              <label 
                htmlFor={`day-${day.value}`}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  id={`day-${day.value}`}
                  checked={isSelected}
                  onCheckedChange={() => toggleDay(day.value)}
                />
                <span className="flex-1 font-medium">
                  {day.label}
                </span>
              </label>

              {isSelected && dayHours && (
                <div className="grid grid-cols-2 gap-3 pl-8 animate-fade-in">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Abertura</Label>
                    <Input
                      type="time"
                      value={dayHours.start}
                      onChange={(e) => updateDayHours(day.value, "start", e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Fechamento</Label>
                    <Input
                      type="time"
                      value={dayHours.end}
                      onChange={(e) => updateDayHours(day.value, "end", e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step08WorkingHours;