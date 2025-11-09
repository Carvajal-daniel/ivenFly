"use client";
import { useState } from "react";
import { UseFormReturn, Path } from "react-hook-form";
import { PlusCircleIcon, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { SERVICES_BY_NICHE } from "./constants";
import type { FormValues } from "./form-schema"; // ajuste o caminho conforme necessário

interface ServicesSelectorProps {
  form: UseFormReturn<FormValues>;
  niche?: string;
}

export function ServicesSelector({ form, niche }: ServicesSelectorProps) {
  const [customService, setCustomService] = useState("");
  const selectedServices = form.watch("services") || [];
  
  const quickSelectServices = niche ? SERVICES_BY_NICHE[niche] || [] : [];

  const addCustomService = () => {
    if (customService.trim()) {
      const current = form.getValues("services") || [];
      const newService = customService.trim();
      if (!current.some((s) => s.toLowerCase() === newService.toLowerCase())) {
        form.setValue("services", [...current, newService] as Path<FormValues>[], { shouldValidate: true, shouldDirty: true });
      }
      setCustomService("");
    }
  };

  const removeService = (service: string) => {
    const current = form.getValues("services") || [];
    form.setValue(
      "services",
      current.filter((s) => s !== service) as Path<FormValues>[],
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <FormField
      control={form.control}
      name="services"
      render={() => (
        <FormItem>
          <div className="flex items-center gap-2">
             <FormLabel className="text-lg font-semibold">Serviços Oferecidos</FormLabel> 
             <InfoTooltip description="Os serviços ou produtos principais que seu negócio oferece aos clientes. Obrigatório ter pelo menos 1 item." />
          </div>
          
          {quickSelectServices.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Seleção rápida:</p>
              <div className="grid grid-cols-2 gap-3">
                {quickSelectServices.map((service) => (
                  <div key={service} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={`service-${service}`}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("services") || [];
                        if (checked) {
                          form.setValue("services", [...current, service] as Path<FormValues>[], { shouldValidate: true, shouldDirty: true });
                        } else {
                          form.setValue(
                            "services",
                            current.filter((s) => s !== service) as Path<FormValues>[],
                            { shouldValidate: true, shouldDirty: true }
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={`service-${service}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 ">
            <p className="text-sm text-muted-foreground">Adicionar serviço personalizado:</p>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Digite um serviço e pressione Enter..."
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomService();
                  }
                }}
                className="border-2 focus:border-primary"
              />
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={addCustomService}
                className="text-primary hover:bg-primary hover:text-primary-foreground transition-colors hover:cursor-pointer"
              >
                <PlusCircleIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {selectedServices.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Serviços selecionados:</p>
              <div className="flex flex-wrap gap-2">
                {selectedServices.map((service) => (
                  <Badge key={service} variant="secondary" className="text-sm py-1.5 px-3 hover:bg-primary/20 transition-colors">
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="ml-2 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
