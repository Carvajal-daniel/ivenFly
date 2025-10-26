import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Card as UICard } from "@/components/ui/card";
import { MapPin, Hash, Building2, Users, Loader2 } from "lucide-react";
import type { FormValues } from "../form-schema";

interface StepTwoLocationProps {
  form: UseFormReturn<FormValues>;
  fetchAddressByCep: (cep: string) => Promise<void>;
  loadingCep: boolean;
}

export function StepTwoLocation({ form, fetchAddressByCep, loadingCep }: StepTwoLocationProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      


      {/* CEP Field com Card Destacado */}
      <UICard className="p-4 sm:p-5 border-2 border-primary/30  from-primary/5 to-transparent shadow-md">
        <FormField control={form.control} name="location.cep" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <FormLabel className="text-sm sm:text-base font-bold">CEP</FormLabel>
              <InfoTooltip description="Obrigatório. Código de Endereçamento Postal para busca automática de endereço." />
            </div>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder="12345-678" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e); 
                    if (e.target.value.replace(/\D/g, "").length === 8) { 
                      fetchAddressByCep(e.target.value); 
                    } 
                  }} 
                  className="h-11 sm:h-12 border-2 focus:border-primary rounded-lg transition-all pl-4 pr-12 font-medium text-sm sm:text-base"
                  disabled={loadingCep}
                />
                {loadingCep && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
            {loadingCep && (
              <p className="text-xs sm:text-sm text-primary font-medium flex items-center gap-2 mt-2 animate-pulse">
                <span className="inline-block w-2 h-2 bg-primary rounded-full" />
                Buscando endereço automaticamente...
              </p>
            )}
          </FormItem>
        )} />
      </UICard>

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background dark:bg-primary rounded-2xl">
            ENDEREÇO COMPLETO
          </span>
        </div>
      </div>

      {/* Street and Number */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <FormField control={form.control} name="location.street" render={({ field }) => (
          <FormItem className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-semibold">Rua/Logradouro</FormLabel>
              <InfoTooltip description="Obrigatório. Nome da rua ou logradouro." />
            </div>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Ex: Av. Paulista"
                className="h-10 sm:h-12 border-2 focus:border-primary rounded-lg transition-all text-sm sm:text-base" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="location.number" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <Hash className="w-4 h-4 text-amber-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-semibold">Número</FormLabel>
              <InfoTooltip description="Obrigatório. Número do edifício ou estabelecimento." />
            </div>
            <FormControl>
              <Input 
                {...field} 
                placeholder="123"
                type="number" 
                className="h-10 sm:h-12 border-2 focus:border-primary rounded-lg transition-all text-sm sm:text-base" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormField control={form.control} name="location.city" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-semibold">Cidade</FormLabel>
              <InfoTooltip description="Obrigatório. Nome da cidade." />
            </div>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Ex: São Paulo"
                className="h-10 sm:h-12 border-2 focus:border-primary rounded-lg transition-all text-sm sm:text-base" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="location.state" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-semibold">Estado</FormLabel>
              <InfoTooltip description="Obrigatório. Sigla do estado (Ex: SP)." />
            </div>
            <FormControl>
              <Input 
                placeholder="SP" 
                maxLength={2} 
                {...field} 
                className="h-10 sm:h-12 border-2 focus:border-primary rounded-lg transition-all uppercase text-sm sm:text-base font-semibold" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background dark:bg-primary rounded-2xl">
            CAPACIDADE
          </span>
        </div>
      </div>

      {/* Capacity com Card Destacado */}
      <UICard className="p-4 sm:p-5 border-2 border-primary/30  from-primary/5 to-transparent shadow-md hover:shadow-lg transition-shadow">
        <FormField control={form.control} name="capacity" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-indigo-100 rounded-lg">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-bold">Capacidade Máxima</FormLabel>
              <InfoTooltip description="Obrigatório. O número máximo de clientes que o local suporta simultaneamente." />
            </div>
            <FormControl>
              <div className="relative">
                <Input 
                  type="number" 
                  {...field} 
                  value={field.value !== undefined ? field.value.toString() : ''} 
                  onChange={(e) => field.onChange(e.target.value)} 
                  placeholder="Ex: 50"
                  min="1"
                  className="h-11 sm:h-12 border-2 focus:border-indigo-500 rounded-lg transition-all text-sm sm:text-base font-medium" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-xs sm:text-sm text-gray-400 font-medium">pessoas</span>
                </div>
              </div>
            </FormControl>
            <p className="text-xs text-gray-500 mt-2">
              Informe o número máximo de clientes que podem ser atendidos ao mesmo tempo
            </p>
            <FormMessage />
          </FormItem>
        )} />
      </UICard>
    </div>
  );
}