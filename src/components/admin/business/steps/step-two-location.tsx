import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { MapPin, Hash, Building2, Users, Loader2, Check } from "lucide-react";
import type { FormValues } from "../form-schema";

interface StepTwoLocationProps {
  form: UseFormReturn<FormValues>;
  fetchAddressByCep: (cep: string) => Promise<void>;
  loadingCep: boolean;
}

export function StepTwoLocation({ form, fetchAddressByCep, loadingCep }: StepTwoLocationProps) {
  const watchedValues = form.watch();
  
  const isCepFilled = watchedValues.location?.cep && watchedValues.location.cep.length > 0;
  const isStreetFilled = watchedValues.location?.street && watchedValues.location.street.length > 0;
  const isNumberFilled = watchedValues.location?.number && watchedValues.location.number.length > 0;
  const isCityFilled = watchedValues.location?.city && watchedValues.location.city.length > 0;
  const isStateFilled = watchedValues.location?.state && watchedValues.location.state.length > 0;
  const isCapacityFilled = watchedValues.capacity !== undefined && watchedValues.capacity !== null && watchedValues.capacity.toString() !== '';

  return (
    <div className="max-w-[50rem] mx-auto space-y-6">
      
      {/* CEP */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isCepFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="location.cep" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              CEP
              <InfoTooltip description="Código de Endereçamento Postal para busca automática de endereço." />
              {isCepFilled && !loadingCep && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
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
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors"
                  disabled={loadingCep}
                />
                {loadingCep && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}
              </div>
            </FormControl>
            {loadingCep && (
              <p className="text-sm text-muted-foreground">
                Buscando endereço...
              </p>
            )}
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Rua e Número - Grid 2 Colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rua - Ocupa 2 colunas */}
        <div className={`md:col-span-2 p-6 rounded-xl transition-all duration-300 ${isStreetFilled ? 'bg-primary/5' : ''}`}>
          <FormField control={form.control} name="location.street" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Rua
                <InfoTooltip description="Nome da rua ou logradouro." />
                {isStreetFilled && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Ex: Av. Paulista"
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Número - Ocupa 1 coluna */}
        <div className={`p-6 rounded-xl transition-all duration-300 ${isNumberFilled ? 'bg-primary/5' : ''}`}>
          <FormField control={form.control} name="location.number" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                Número
                <InfoTooltip description="Número do estabelecimento." />
                {isNumberFilled && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="123"
                  type="number" 
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* Cidade e Estado - Grid 2 Colunas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Cidade - Ocupa 3 colunas */}
        <div className={`md:col-span-3 p-6 rounded-xl transition-all duration-300 ${isCityFilled ? 'bg-primary/5' : ''}`}>
          <FormField control={form.control} name="location.city" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Cidade
                <InfoTooltip description="Nome da cidade." />
                {isCityFilled && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Ex: São Paulo"
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Estado - Ocupa 1 coluna */}
        <div className={`p-6 rounded-xl transition-all duration-300 ${isStateFilled ? 'bg-primary/5' : ''}`}>
          <FormField control={form.control} name="location.state" render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                UF
                <InfoTooltip description="Sigla do estado (Ex: SP)." />
                {isStateFilled && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="SP" 
                  maxLength={2} 
                  {...field} 
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors uppercase" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* Capacidade */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isCapacityFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="capacity" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Capacidade Máxima
              <InfoTooltip description="Número máximo de clientes que o local suporta simultaneamente." />
              {isCapacityFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type="number" 
                  {...field} 
                  value={field.value !== undefined ? field.value.toString() : ''} 
                  onChange={(e) => field.onChange(e.target.value)} 
                  placeholder="Ex: 50"
                  min="1"
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-sm text-muted-foreground">pessoas</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  );
}