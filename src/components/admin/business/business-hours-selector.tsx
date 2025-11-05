"use client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Clock, Zap, Coffee, Sunset, Moon, Stars, AlertCircle, Check } from "lucide-react"; 
import { Input } from "@/components/ui/input";
import { FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { DAYS } from "./constants";
import type { FormValues } from "./form-schema";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

interface BusinessHoursSelectorProps {
  form: UseFormReturn<FormValues>;
}

const DAY_ICONS = {
  Monday: Zap,
  Tuesday: Zap,
  Wednesday: Coffee,
  Thursday: Coffee,
  Friday: Sunset,
  Saturday: Moon,
  Sunday: Stars
};

const DAY_COLORS = {
  Monday: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  Tuesday: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  Wednesday: "from-green-500/10 to-emerald-500/10 border-green-500/20",
  Thursday: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
  Friday: "from-rose-500/10 to-red-500/10 border-rose-500/20",
  Saturday: "from-indigo-500/10 to-violet-500/10 border-indigo-500/20",
  Sunday: "from-slate-500/10 to-gray-500/10 border-slate-500/20"
};

const DAY_ICON_COLORS = {
  Monday: "text-blue-600",
  Tuesday: "text-purple-600",
  Wednesday: "text-green-600",
  Thursday: "text-orange-600",
  Friday: "text-rose-600",
  Saturday: "text-indigo-600",
  Sunday: "text-slate-600"
};

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

  const toggleDayClosed = (index: number, isOpen: boolean) => {
    const updated = [...businessHours];
    if (!updated[index]) return;

    if (isOpen) {
      updated[index] = { ...updated[index], open: "09:00", close: "18:00" };
    } else {
      updated[index] = { ...updated[index], open: "Closed", close: "Closed" };
    }
    forceUpdate(updated);
  };

  const applyQuickSchedule = (type: "weekdays" | "weekend" | "24/7" | "9to5") => {
    const updated = businessHours.map((day, idx) => {
      const dayName = DAYS[idx].value;
      const isWeekend = dayName === "Saturday" || dayName === "Sunday";
      
      if (type === "weekdays") {
        return isWeekend ? { ...day, open: "Closed", close: "Closed" } : { ...day, open: "08:00", close: "18:00" };
      } else if (type === "weekend") {
        return isWeekend ? { ...day, open: "10:00", close: "20:00" } : { ...day, open: "Closed", close: "Closed" };
      } else if (type === "24/7") {
        return { ...day, open: "00:00", close: "23:59" };
      } else {
        return { ...day, open: "09:00", close: "17:00" };
      }
    });
    forceUpdate(updated);
  };

  const openDays = businessHours.filter(d => d.open !== "Closed").length;
  const totalHours = businessHours.reduce((acc, day) => {
    if (day.open === "Closed") return acc;
    const [openH, openM] = day.open.split(':').map(Number);
    const [closeH, closeM] = day.close.split(':').map(Number);
    const hours = (closeH * 60 + closeM - openH * 60 - openM) / 60;
    return acc + hours;
  }, 0);

  const isConfigured = businessHours.length > 0 && businessHours.some(d => d.open !== "Closed");

  return (
    <div className="max-w-[50rem] mx-auto space-y-6">
      {/* Header */}
      <div className={`p-4 rounded-xl transition-all duration-300 ${isConfigured ? 'bg-primary/5' : ''}`}>
        <FormLabel className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Horário de Funcionamento
          <InfoTooltip description="Configure os horários de abertura e fechamento do seu negócio para cada dia da semana." />
          {isConfigured && (
            <div className="ml-auto">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          )}
        </FormLabel>
        <p className="text-sm text-muted-foreground mt-2 ml-7">
          Configure seus horários de forma inteligente e rápida
        </p>
        
        <div className="flex gap-3 mt-4 ml-7">
          <div className="px-4 py-2 rounded-lg bg-muted">
            <div className="text-lg font-bold">{openDays}/7</div>
            <div className="text-xs text-muted-foreground">Dias Abertos</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-muted">
            <div className="text-lg font-bold">{totalHours.toFixed(0)}h</div>
            <div className="text-xs text-muted-foreground">Total Semanal</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 rounded-xl bg-accent/30">
        <FormLabel className="text-base font-semibold mb-4 block">
          Atalhos Rápidos
        </FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => applyQuickSchedule("9to5")}
            className="h-auto py-3 flex flex-col items-center gap-1.5 hover:bg-primary/10 hover:border-primary transition-all border-2 border-border/40"
          >
            <Coffee className="h-4 w-4" />
            <div className="text-xs font-semibold">Comercial</div>
            <div className="text-[10px] text-muted-foreground">9h-17h</div>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => applyQuickSchedule("weekdays")}
            className="h-auto py-3 flex flex-col items-center gap-1.5 hover:bg-primary/10 hover:border-primary transition-all border-2 border-border/40"
          >
            <Zap className="h-4 w-4" />
            <div className="text-xs font-semibold">Seg-Sex</div>
            <div className="text-[10px] text-muted-foreground">8h-18h</div>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => applyQuickSchedule("weekend")}
            className="h-auto py-3 flex flex-col items-center gap-1.5 hover:bg-primary/10 hover:border-primary transition-all border-2 border-border/40"
          >
            <Moon className="h-4 w-4" />
            <div className="text-xs font-semibold">Fim de Semana</div>
            <div className="text-[10px] text-muted-foreground">10h-20h</div>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => applyQuickSchedule("24/7")}
            className="h-auto py-3 flex flex-col items-center gap-1.5 hover:bg-primary/10 hover:border-primary transition-all border-2 border-border/40"
          >
            <Stars className="h-4 w-4" />
            <div className="text-xs font-semibold">24/7</div>
            <div className="text-[10px] text-muted-foreground">Sempre</div>
          </Button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {businessHours.length === DAYS.length && businessHours.map((dayHours, index) => {
          const day = DAYS[index];
          const isClosed = dayHours.open === "Closed";
          const Icon = DAY_ICONS[day.value as keyof typeof DAY_ICONS];
          const colorClass = DAY_COLORS[day.value as keyof typeof DAY_COLORS];
          const iconColor = DAY_ICON_COLORS[day.value as keyof typeof DAY_ICON_COLORS];
         
          return (
            <div 
              key={day.value} 
              className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                isClosed 
                  ? 'opacity-50 border-dashed border-border/40' 
                  : `bg-gradient-to-br ${colorClass}`
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isClosed ? 'text-muted-foreground' : iconColor}`} />
                  <div>
                    <div className="font-semibold text-base">{day.label}</div>
                    {!isClosed && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {dayHours.open} até {dayHours.close}
                      </div>
                    )}
                    {isClosed && (
                      <div className="text-xs text-muted-foreground mt-0.5">Fechado</div>
                    )}
                  </div>
                </div>
                
                <Switch
                  checked={!isClosed}
                  onCheckedChange={(checked) => toggleDayClosed(index, checked)}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {!isClosed && (
                <div className="grid grid-cols-2 gap-3">
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                      Abertura
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        value={dayHours.open}
                        onChange={(e) => updateDayHours(index, "open", e.target.value)}
                        className="h-11 text-base border-2 border-border/40 focus:border-primary transition-colors"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                      Fechamento
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        value={dayHours.close}
                        onChange={(e) => updateDayHours(index, "close", e.target.value)}
                        className="h-11 text-base border-2 border-border/40 focus:border-primary transition-colors"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {form.formState.errors.businessHours?.message && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <FormMessage className="text-sm font-medium text-destructive">
            {form.formState.errors.businessHours?.message as string}
          </FormMessage>
        </div>
      )}
    </div>
  );
}