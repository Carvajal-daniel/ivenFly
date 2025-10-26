import { UseFormReturn } from "react-hook-form";
import { DollarSign, TrendingUp, TrendingDown, CalendarClock, PiggyBank } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Card as UICard } from "@/components/ui/card";
import type { FormValues } from "../form-schema";

interface StepFourFinancialProps {
  form: UseFormReturn<FormValues>;
  calculateAveragePrice: () => string;
}

export function StepFourFinancial({ form, calculateAveragePrice }: StepFourFinancialProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      
    
      
      {/* Receita e Despesas (Opcional) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded-lg">
            <PiggyBank className="h-4 w-4 text-gray-600" />
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-700">
            Fluxo de Caixa
            <span className="text-xs font-normal text-gray-500 ml-2">(Opcional)</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Receita Mensal */}
          <UICard className="p-4 border-2 border-green-200  from-green-50/50 to-transparent hover:shadow-md transition-all">
            <FormField control={form.control} name="revenue" render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <FormLabel className="text-sm sm:text-base font-semibold">
                    Receita Mensal
                  </FormLabel>
                  <InfoTooltip description="Opcional. Estimativa de faturamento mensal bruto." />
                </div>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00"
                      {...field} 
                      value={field.value !== undefined ? field.value.toString() : ''} 
                      onChange={(e) => field.onChange(e.target.value)} 
                      className="h-10 sm:h-11 border-2 focus:border-green-500 transition-all pl-9 sm:pl-10 text-sm sm:text-base font-medium" 
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      R$
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </UICard>
          
          {/* Despesas Mensais */}
          <UICard className="p-4 border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-transparent hover:shadow-md transition-all dark:bg-gradient-to-br dark:from-red-900/10">
            <FormField control={form.control} name="expenses" render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-red-100 rounded-lg">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                  <FormLabel className="text-sm sm:text-base font-semibold">
                    Despesas Mensais
                  </FormLabel>
                  <InfoTooltip description="Opcional. Total de custos operacionais (aluguel, salários, insumos, etc.)." />
                </div>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00"
                      {...field} 
                      value={field.value !== undefined ? field.value.toString() : ''} 
                      onChange={(e) => field.onChange(e.target.value)} 
                      className="h-10 sm:h-11 border-2 focus:border-red-500 transition-all pl-9 sm:pl-10 text-sm sm:text-base font-medium" 
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      R$
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </UICard>
        </div>
      </div>

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background dark:bg-primary rounded-2xl">
            PRECIFICAÇÃO
          </span>
        </div>
      </div>

      {/* Preço Mínimo e Máximo (Obrigatório) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200">
            Faixa de Preços dos Serviços
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Preço Mínimo */}
          <FormField control={form.control} name="minServicePrice" render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 mb-2">
                <FormLabel className="text-sm sm:text-base font-semibold">
                  Preço Mínimo
                </FormLabel>
                <InfoTooltip description="Obrigatório. O valor mais baixo cobrado por um serviço. Deve ser maior que zero." />
              </div>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold text-sm sm:text-base">
                    R$
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.01"
                    {...field} 
                    value={field.value !== undefined ? field.value.toString() : ''} 
                    onChange={(e) => field.onChange(e.target.value)} 
                    className="h-10 sm:h-11 border-2 focus:border-primary transition-all pl-10 sm:pl-12 text-sm sm:text-base font-medium" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          {/* Preço Máximo */}
          <FormField control={form.control} name="maxServicePrice" render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 mb-2">
                <FormLabel className="text-sm sm:text-base font-semibold">
                  Preço Máximo
                </FormLabel>
                <InfoTooltip description="Obrigatório. O valor mais alto cobrado por um serviço. Deve ser maior que zero e maior ou igual ao mínimo." />
              </div>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold text-sm sm:text-base">
                    R$
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="100.00"
                    {...field} 
                    value={field.value !== undefined ? field.value.toString() : ''} 
                    onChange={(e) => field.onChange(e.target.value)} 
                    className="h-10 sm:h-11 border-2 focus:border-primary transition-all pl-10 sm:pl-12 text-sm sm:text-base font-medium" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* Preço Médio Calculado (Destaque) */}
      <UICard className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-gray-700">
              Preço Médio Estimado
            </p>
          </div>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
            R$ {calculateAveragePrice()}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Calculado automaticamente com base nos valores mínimo e máximo
          </p>
        </div>
      </UICard>

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background">
            RELATÓRIOS
          </span>
        </div>
      </div>

      {/* Frequência de Relatórios */}
      <FormField control={form.control} name="reportFrequency" render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <CalendarClock className="h-4 w-4 text-blue-600" />
            </div>
            <FormLabel className="text-sm sm:text-base font-semibold">
              Frequência de Relatórios
            </FormLabel>
            <InfoTooltip description="Obrigatório. Com que frequência você deseja receber relatórios de desempenho." />
          </div>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="h-10 sm:h-11 border-2 focus:border-primary transition-all text-sm sm:text-base hover:border-primary/60">
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-popover">
              <SelectItem 
                value="diária" 
                className="hover:bg-primary/10 cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-primary">Diária</span>
                  <span className="text-xs text-gray-500">Recomendado para alto volume</span>
                </div>
              </SelectItem>
              <SelectItem 
                value="semanal" 
                className="hover:bg-primary/10 cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-primary">Semanal</span>
                  <span className="text-xs text-gray-500">Padrão - equilibrado</span>
                </div>
              </SelectItem>
              <SelectItem 
                value="mensal" 
                className="hover:bg-primary/10 cursor-pointer py-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-primary">Mensal</span>
                  <span className="text-xs text-gray-500">Visão estratégica</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2">
            Define quando você receberá análises de desempenho
          </p>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}