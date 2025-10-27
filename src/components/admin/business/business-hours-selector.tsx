"use client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Clock, Zap, Coffee, Sunset, Moon, Stars, AlertCircle } from "lucide-react"; 
import { Input } from "@/components/ui/input";
import { Card as UICard } from "@/components/ui/card";
import { FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
  Monday: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  Tuesday: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  Wednesday: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  Thursday: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  Friday: "from-rose-500/20 to-red-500/20 border-rose-500/30",
  Saturday: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
  Sunday: "from-slate-500/20 to-gray-500/20 border-slate-500/30"
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

  return (
    <div className="space-y-6">
      {/* Header Premium */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-8 w-8" />
            <h2 className="text-lg md:text-2xl font-black">Horário de Funcionamento</h2>
          </div>
          <p className="text-white/90 text-sm max-w-2xl">
            Configure seus horários de forma inteligente e rápida
          </p>
          
          <div className="flex gap-4 mt-6 flex-wrap items-center ">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
              <div className="text-xl md:text-2xl font-bold">{openDays}/7</div>
              <div className="text-xs text-white/80">Dias Abertos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
              <div className="text-xl md:text-2xl font-bold">{totalHours.toFixed(0)}h</div>
              <div className="text-xs text-white/80">Total Semanal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => applyQuickSchedule("9to5")}
          className="h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Coffee className="h-5 w-5" />
          <div className="text-xs font-semibold">Comercial</div>
          <div className="text-[10px] text-muted-foreground">9h às 17h</div>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => applyQuickSchedule("weekdays")}
          className="h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Zap className="h-5 w-5" />
          <div className="text-xs font-semibold">Seg-Sex</div>
          <div className="text-[10px] text-muted-foreground">8h às 18h</div>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => applyQuickSchedule("weekend")}
          className="h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Moon className="h-5 w-5" />
          <div className="text-xs font-semibold">Fim de Semana</div>
          <div className="text-[10px] text-muted-foreground">10h às 20h</div>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => applyQuickSchedule("24/7")}
          className="h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Stars className="h-5 w-5" />
          <div className="text-xs font-semibold">24/7</div>
          <div className="text-[10px] text-muted-foreground">Sempre Aberto</div>
        </Button>
      </div>

      {/* Days Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {businessHours.length === DAYS.length && businessHours.map((dayHours, index) => {
          const day = DAYS[index];
          const isClosed = dayHours.open === "Closed";
          const Icon = DAY_ICONS[day.value as keyof typeof DAY_ICONS];
          const colorClass = DAY_COLORS[day.value as keyof typeof DAY_COLORS];
         
          return (
            <UICard 
              key={day.value} 
              className={`relative overflow-hidden border-2 transition-all duration-300 ${
                isClosed 
                  ? 'opacity-50 grayscale border-dashed' 
                  : `bg-gradient-to-br ${colorClass} shadow-lg hover:shadow-xl hover:scale-[1.02]`
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isClosed ? 'bg-gray-300' : 'bg-white/80 shadow-md'}`}>
                      <Icon className={`h-5 w-5 ${isClosed ? 'text-gray-500' : 'text-primary'}`} />
                    </div>
                    <div>
                      <div className="font-black text-lg">{day.label}</div>
                      {!isClosed && (
                        <div className="text-xs font-mono text-muted-foreground">
                          {dayHours.open} → {dayHours.close}
                        </div>
                      )}
                      {isClosed && (
                        <div className="text-xs text-gray-500 font-medium">FECHADO</div>
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
                      <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Abre
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          value={dayHours.open}
                          onChange={(e) => updateDayHours(index, "open", e.target.value)}
                          className="border-2 focus:border-primary h-12 text-lg font-bold bg-white/50"
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Fecha
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          value={dayHours.close}
                          onChange={(e) => updateDayHours(index, "close", e.target.value)}
                          className="border-2 focus:border-primary h-12 text-lg font-bold bg-white/50"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              </div>
            </UICard>
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