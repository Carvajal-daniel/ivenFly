import { UseFormReturn } from "react-hook-form";
import { DollarSign, TrendingUp, TrendingDown, CalendarClock, Check } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import type { FormValues } from "../form-schema";

interface StepFourFinancialProps {
  form: UseFormReturn<FormValues>;
  calculateAveragePrice: () => string;
}

export function StepFourFinancial({ form, calculateAveragePrice }: StepFourFinancialProps) {
  const watchedValues = form.watch();
  
  const isRevenueFilled = watchedValues.revenue !== undefined && watchedValues.revenue !== null && watchedValues.revenue.toString() !== '';
  const isExpensesFilled = watchedValues.expenses !== undefined && watchedValues.expenses !== null && watchedValues.expenses.toString() !== '';
  const isMinPriceFilled = watchedValues.minServicePrice !== undefined && watchedValues.minServicePrice !== null && watchedValues.minServicePrice.toString() !== '';
  const isMaxPriceFilled = watchedValues.maxServicePrice !== undefined && watchedValues.maxServicePrice !== null && watchedValues.maxServicePrice.toString() !== '';
  const isReportFrequencyFilled = watchedValues.reportFrequency && watchedValues.reportFrequency.length > 0;
  
  const isCashFlowFilled = isRevenueFilled || isExpensesFilled;
  const isPricingFilled = isMinPriceFilled && isMaxPriceFilled;

  return (
    <div className="max-w-[51rem] mx-auto space-y-6">
      
      {/* Receita e Despesas */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isCashFlowFilled ? 'bg-primary/5' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-lg font-semibold">
            Fluxo de Caixa
            <span className="text-sm font-normal text-muted-foreground ml-2">(Opcional)</span>
          </h4>
          {isCashFlowFilled && (
            <div className="ml-auto">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Receita Mensal */}
          <FormField control={form.control} name="revenue" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Receita Mensal
                <InfoTooltip description="Opcional. Estimativa de faturamento mensal bruto." />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00"
                    {...field} 
                    value={field.value !== undefined ? field.value.toString() : ''} 
                    onChange={(e) => field.onChange(e.target.value)} 
                    className="h-12 text-base border-border/40 focus:border-primary transition-colors pl-12" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          {/* Despesas Mensais */}
          <FormField control={form.control} name="expenses" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Despesas Mensais
                <InfoTooltip description="Opcional. Total de custos operacionais." />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00"
                    {...field} 
                    value={field.value !== undefined ? field.value.toString() : ''} 
                    onChange={(e) => field.onChange(e.target.value)} 
                    className="h-12 text-base border-border/40 focus:border-primary transition-colors pl-12" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* Preço Mínimo e Máximo */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isPricingFilled ? 'bg-primary/5' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-lg font-semibold">
            Faixa de Preços dos Serviços
          </h4>
          {isPricingFilled && (
            <div className="ml-auto">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Preço Mínimo */}
          <FormField control={form.control} name="minServicePrice" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Preço Mínimo
                <InfoTooltip description="Obrigatório. O valor mais baixo cobrado." />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.01"
                    {...field} 
                    value={field.value !== undefined ? field.value.toString() : ''} 
                    onChange={(e) => field.onChange(e.target.value)} 
                    className="h-12 text-base border-border/40 focus:border-primary transition-colors pl-12" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          
          {/* Preço Máximo */}
          <FormField control={form.control} name="maxServicePrice" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Preço Máximo
                <InfoTooltip description="Obrigatório. O valor mais alto cobrado." />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="100.00"
                    {...field} 
                    value={field.value !== undefined ? field.value.toString() : ''} 
                    onChange={(e) => field.onChange(e.target.value)} 
                    className="h-12 text-base border-border/40 focus:border-primary transition-colors pl-12" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Preço Médio Calculado */}
        {isPricingFilled && (
          <div className="mt-6 p-6 bg-primary/10 rounded-xl border-2 border-primary/20">
            <div className="text-center space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">
                Preço Médio Estimado
              </p>
              <p className="text-4xl font-bold text-primary">
                R$ {calculateAveragePrice()}
              </p>
              <p className="text-xs text-muted-foreground">
                Calculado automaticamente
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Frequência de Relatórios */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isReportFrequencyFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="reportFrequency" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Frequência de Relatórios
              <InfoTooltip description="Obrigatório. Com que frequência você deseja receber relatórios." />
              {isReportFrequencyFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-base border-border/40 focus:border-primary transition-colors">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="diária" className="py-2.5 cursor-pointer">
                  Diária
                </SelectItem>
                <SelectItem value="semanal" className="py-2.5 cursor-pointer">
                  Semanal
                </SelectItem>
                <SelectItem value="mensal" className="py-2.5 cursor-pointer">
                  Mensal
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