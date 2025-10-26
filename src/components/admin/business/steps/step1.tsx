import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Card as UICard } from "@/components/ui/card";
import { Building2, Layers, PencilLine, Clock } from "lucide-react"; 
import type { FormValues } from "../form-schema";
import { NICHES } from "../constants";

interface StepOneBasicInfoProps {
  form: UseFormReturn<FormValues>;
}

export function StepOneBasicInfo({ form }: StepOneBasicInfoProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      
     

      {/* Nome do Negócio - Destaque Principal */}
      <UICard className="p-4 sm:p-5 border-2 border-primary/30  from-primary/5 to-transparent shadow-md hover:shadow-lg transition-all dark:bg-primary/10">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <FormLabel className="text-sm sm:text-base font-bold">
                Nome do Negócio
              </FormLabel>
              <InfoTooltip description="Obrigatório. O nome oficial ou comercial do seu estabelecimento." />
            </div>
            <FormControl>
              <Input 
                placeholder="Ex: Barberia do Zé" 
                {...field} 
                className="h-11 sm:h-12 border-2 focus:border-primary transition-all text-sm sm:text-base font-medium dark:bg-card dark:text-card-foreground" 
              />
            </FormControl>
            <FormMessage />
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
            CATEGORIA
          </span>
        </div>
      </div>
      
      {/* Nicho */}
      <FormField control={form.control} name="niche" render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Layers className="h-4 w-4 text-blue-600" />
            </div>
            <FormLabel className="text-sm sm:text-base font-semibold">
              Nicho de Mercado
            </FormLabel>
            <InfoTooltip description="Obrigatório. O principal setor de atuação do seu negócio. Isso ajuda a personalizar as sugestões de serviços." />
          </div>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="h-11 sm:h-12 border-2 focus:border-primary transition-all text-sm dark:bg-card dark:text-white sm:text-base hover:border-primary/60">
                <SelectValue placeholder="Selecione o nicho do seu negócio" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-popover">
              {NICHES.map((niche) => (
                <SelectItem 
                  key={niche} 
                  value={niche} 
                  className="hover:bg-primary/10 transition-colors cursor-pointer py-3 dark:text-white"
                >
                  <span className="font-medium">{niche}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2 dark:text-white">
            Escolha a categoria que melhor representa seu negócio
          </p>
          <FormMessage />
        </FormItem>
      )} />

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background dark:bg-primary rounded-2xl ">
            SOBRE O NEGÓCIO
          </span>
        </div>
      </div>
      
      {/* Descrição */}
      <UICard className="p-4 sm:p-5 border-2 border-primary/30  from-primary/5 to-transparent shadow-md hover:shadow-lg transition-all">
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <PencilLine className="h-4 w-4 text-amber-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-bold">
                Descrição Detalhada
              </FormLabel>
              <InfoTooltip description="Obrigatório. Uma breve, mas detalhada, descrição do seu negócio, seus diferenciais e público-alvo." />
            </div>
            <FormControl>
              <Textarea 
                placeholder="Descreva seu negócio, seus diferenciais e o que o torna especial. Conte sobre sua história, o que oferece e quem é seu público-alvo..." 
                className="resize-y border-2 focus:border-amber-500 min-h-[120px] sm:min-h-[140px] transition-all text-sm sm:text-base" 
                {...field} 
              />
            </FormControl>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Mínimo de 10 caracteres
              </p>
              <p className="text-xs text-gray-400">
                {field.value?.length || 0} caracteres
              </p>
            </div>
            <FormMessage />
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
            EXPERIÊNCIA
          </span>
        </div>
      </div>
      
      {/* Tempo de Operação */}
      <FormField control={form.control} name="operatingYears" render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Clock className="h-4 w-4 text-green-600" />
            </div>
            <FormLabel className="text-sm sm:text-base font-semibold">
              Tempo de Operação
            </FormLabel>
            <InfoTooltip description="Obrigatório. Há quanto tempo o negócio está em atividade." />
          </div>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="h-11 sm:h-12 border-2 focus:border-primary transition-all text-sm sm:text-base hover:border-primary/60">
                <SelectValue placeholder="Há quanto tempo está em operação?" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-popover">
              <SelectItem 
                value="0-1 ano" 
                className="hover:bg-primary/10 transition-colors cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium dark:text-white">0-1 ano</span>
                  <span className="text-xs text-gray-500">Negócio Novo</span>
                </div>
              </SelectItem>
              <SelectItem 
                value="1-3 anos" 
                className="hover:bg-primary/10 transition-colors cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium dark:text-white">1-3 anos</span>
                  <span className="text-xs text-gray-500">Em Crescimento</span>
                </div>
              </SelectItem>
              <SelectItem 
                value="3-5 anos" 
                className="hover:bg-primary/10 transition-colors cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium dark:text-white">3-5 anos</span>
                  <span className="text-xs text-gray-500">Estabelecido</span>
                </div>
              </SelectItem>
              <SelectItem 
                value="5+ anos" 
                className="hover:bg-primary/10 transition-colors cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium dark:text-white">5+ anos</span>
                  <span className="text-xs text-gray-500">Consolidado</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2">
            Isso nos ajuda a entender a maturidade do seu negócio
          </p>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}