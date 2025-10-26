"use client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Clock, Lock, Unlock } from "lucide-react"; 
import { Input } from "@/components/ui/input";
import { Card as UICard } from "@/components/ui/card";
import { FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoTooltip } from "@/components/ui/info-tooltip"; 
import { DAYS } from "./constants";
import type { FormValues } from "./form-schema";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

interface BusinessHoursSelectorProps {
  form: UseFormReturn<FormValues>; // <-- FormValues completo
}


export function BusinessHoursSelector({ form }: BusinessHoursSelectorProps) {
  const businessHours = form.watch("businessHours") || []; 

  useEffect(() => {
    if (businessHours.length === 0) {
      const initialHours: BusinessHours[] = DAYS.map(day => ({
        day: day.value,
        open: "09:00",
        close: day.value === "Sunday" ? "Closed" : "18:00",
      }));
      form.setValue("businessHours", initialHours, { shouldValidate: true });
    }
  }, [businessHours.length, form]);

  const forceUpdate = (updatedArray: BusinessHours[]) => {
    form.setValue("businessHours", updatedArray, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  }

  const updateDayHours = (index: number, field: keyof Omit<BusinessHours, "day">, value: string) => {
    const updated = [...businessHours];
    if (!updated[index]) return; 
    updated[index] = { ...updated[index], [field]: value };
    forceUpdate(updated);
  };

  const toggleDayClosed = (index: number, isClosed: boolean) => {
    const updated = [...businessHours];
    if (!updated[index]) return;

    if (isClosed) {
      updated[index] = { ...updated[index], open: "Closed", close: "Closed" };
    } else {
      updated[index] = { ...updated[index], open: "09:00", close: "18:00" };
    }
    forceUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FormLabel className="text-xl font-bold flex items-center gap-2 text-primary">
            <Clock className="h-6 w-6" />
            Horário de Funcionamento Semanal
        </FormLabel>
        <InfoTooltip description="Obrigatório. Defina os horários de abertura e fechamento para cada um dos 7 dias da semana." />
      </div>

      <div className="space-y-4">
        {businessHours.length === DAYS.length && businessHours.map((dayHours, index) => {
          const day = DAYS[index];
          const isClosed = dayHours.open === "Closed";
         
          return (
            <UICard 
              key={day.value} 
              className={`p-4 space-y-3 transition-all duration-300 border-2 ${
                isClosed 
                  ? 'border-gray-200 bg-gray-50 dark:bg-gray-900/50 opacity-70' 
                  : 'border-primary/50 bg-primary/5 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-base flex items-center gap-2 ${isClosed ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {isClosed ? <Lock className="h-4 w-4 text-destructive" /> : <Unlock className="h-4 w-4 text-primary" />}
                    {day.label}
                </span>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`closed-${day.value}`}
                    checked={isClosed}
                    onCheckedChange={(checked) => toggleDayClosed(index, !!checked)}
                    className="h-5 w-5 border-2 data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground"
                  />
                  <label
                    htmlFor={`closed-${day.value}`}
                    className={`text-sm cursor-pointer select-none ${isClosed ? 'text-destructive font-medium' : 'text-muted-foreground'}`}
                  >
                    Fechado
                  </label>
                </div>
              </div>

              {!isClosed && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-primary/80">ABERTURA</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        value={dayHours.open}
                        onChange={(e) => updateDayHours(index, "open", e.target.value)}
                        className="border-2 focus:border-primary h-10 transition-colors"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-primary/80">FECHAMENTO</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        value={dayHours.close}
                        onChange={(e) => updateDayHours(index, "close", e.target.value)}
                        className="border-2 focus:border-primary h-10 transition-colors"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            </UICard>
          );
        })}
      </div>
      
      <FormMessage>{form.formState.errors.businessHours?.message as string}</FormMessage>
    </div>
  );
}
