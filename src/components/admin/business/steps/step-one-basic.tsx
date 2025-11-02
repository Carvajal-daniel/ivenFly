import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Building2, Layers, PencilLine, Clock, Check } from "lucide-react"; 
import type { FormValues } from "../form-schema";
import { NICHES } from "../constants";

interface StepOneBasicInfoProps {
  form: UseFormReturn<FormValues>;
}

export function StepOneBasicInfo({ form }: StepOneBasicInfoProps) {
  const watchedValues = form.watch();
  
  // Verificar se cada campo está preenchido
  const isNameFilled = watchedValues.name && watchedValues.name.length > 0;
  const isNicheFilled = watchedValues.niche && watchedValues.niche.length > 0;
  const isDescriptionFilled = watchedValues.description && watchedValues.description.length >= 10;
  const isOperatingYearsFilled = watchedValues.operatingYears && watchedValues.operatingYears.length > 0;

  return (
    <div className="max-w-[50rem] mx-auto space-y-3">
      
      {/* Nome do Negócio */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isNameFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Nome do Negócio
              <InfoTooltip description="O nome oficial ou comercial do seu estabelecimento." />
              {isNameFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Uplys Tech Solutions" 
                {...field} 
                className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Nicho */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isNicheFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="niche" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Nicho de Mercado
              <InfoTooltip description="O principal setor de atuação do seu negócio." />
              {isNicheFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-base border-border/40 focus:border-primary transition-colors">
                  <SelectValue placeholder="Selecione seu nicho" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {NICHES.map((niche) => (
                  <SelectItem 
                    key={niche} 
                    value={niche} 
                    className="py-2.5 cursor-pointer"
                  >
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Descrição */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isDescriptionFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <PencilLine className="h-5 w-5 text-primary" />
              Descrição do Negócio
              <InfoTooltip description="Uma breve descrição do seu negócio e seus diferenciais." />
              {isDescriptionFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva seu negócio, o que oferece e seu público-alvo..." 
                className="min-h-[140px] text-base border-border/40 focus:border-primary transition-colors resize-none" 
                {...field} 
              />
            </FormControl>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Mínimo 10 caracteres</span>
              <span>{field.value?.length || 0}</span>
            </div>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Tempo de Operação */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isOperatingYearsFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="operatingYears" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Tempo de Operação
              <InfoTooltip description="Há quanto tempo o negócio está em atividade." />
              {isOperatingYearsFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-base border-border/40 focus:border-primary transition-colors">
                  <SelectValue placeholder="Selecione o tempo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0-1 ano" className="py-2.5 cursor-pointer">
                  0-1 ano
                </SelectItem>
                <SelectItem value="1-3 anos" className="py-2.5 cursor-pointer">
                  1-3 anos
                </SelectItem>
                <SelectItem value="3-5 anos" className="py-2.5 cursor-pointer">
                  3-5 anos
                </SelectItem>
                <SelectItem value="5+ anos" className="py-2.5 cursor-pointer">
                  5+ anos
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  );
}