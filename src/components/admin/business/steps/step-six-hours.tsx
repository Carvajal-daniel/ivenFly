import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../form-schema";
import { BusinessHoursSelector } from "../business-hours-selector";

interface StepSixHoursProps {
  form: UseFormReturn<FormValues>;
}

export function StepSixHours({ form }: StepSixHoursProps) {
  return (
    <div className="space-y-6">
      <BusinessHoursSelector form={form} />
    </div>
  );
}