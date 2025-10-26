import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Card as UICard } from "@/components/ui/card";
import { Globe, Hash, Send, AlertTriangle } from "lucide-react"; 
import type { FormValues } from "../form-schema";

interface StepFiveMarketingProps {
  form: UseFormReturn<FormValues>;
  usesSocialMedia: boolean;
}

const SOCIAL_PLATFORMS = ["Instagram", "Facebook", "TikTok", "WhatsApp Business", "LinkedIn"];
const POSTING_FREQUENCY_OPTIONS = ["Diariamente", "3x por semana", "1x por semana", "Quinzenalmente", "Mensalmente"];

export function StepFiveMarketing({ form, usesSocialMedia }: StepFiveMarketingProps) {
  return (
    <div className="space-y-6 sm:space-y-8">

      {/* 1. TOGGLE DE REDES SOCIAIS (Destaque Principal) */}
      <UICard className={`p-4 sm:p-6 border-2 transition-all duration-300 ${
        usesSocialMedia 
          ? 'border-primary  from-primary/10 via-primary/5 to-transparent shadow-lg' 
          : 'border-gray-200 hover:border-primary/40 hover:shadow-md'
      }`}>
        <FormField control={form.control} name="usesSocialMedia" render={({ field }) => (
          <FormItem className="flex items-start gap-3 sm:gap-4 space-y-0">
            <FormControl>
              <Checkbox 
                id="uses-social-media"
                checked={field.value as boolean} 
                onCheckedChange={field.onChange} 
                className={`mt-1 h-5 w-5 sm:h-6 sm:w-6 border-2 transition-all ${
                  usesSocialMedia 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-300'
                }`}
              />
            </FormControl>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  usesSocialMedia ? 'bg-primary/20' : 'bg-gray-100'
                }`}>
                  <Globe className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    usesSocialMedia ? 'text-primary' : 'text-gray-500'
                  }`} />
                </div>
                <FormLabel htmlFor="uses-social-media" className="font-bold cursor-pointer text-sm sm:text-base">
                  O Negócio Utiliza Redes Sociais?
                </FormLabel>
                <InfoTooltip description="Obrigatório. Marque se o negócio possui presença ativa em redes sociais. Ativar esta opção torna os campos seguintes obrigatórios." />
              </div>
              <p className={`text-xs sm:text-sm transition-colors ${
                usesSocialMedia ? 'text-primary/80' : 'text-gray-500'
              }`}>
                {usesSocialMedia 
                  ? '✓ Ótimo! Configure suas plataformas e frequência abaixo' 
                  : 'Ative para configurar suas plataformas e frequência de postagens'
                }
              </p>
            </div>
          </FormItem>
        )} />
      </UICard>

      {/* 2. CAMPOS CONDICIONAIS (Plataformas e Frequência) */}
      {usesSocialMedia && (
        <>
          {/* Divisor Visual */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-primary/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-xs font-semibold text-primary bg-background rounded-2xl">
                PLATAFORMAS ATIVAS
              </span>
            </div>
          </div>

          {/* Plataformas de Redes Sociais */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Hash className="h-4 w-4 text-blue-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-semibold">
                Plataformas de Redes Sociais
              </FormLabel>
              <InfoTooltip description="Obrigatório se usar redes sociais. Selecione as plataformas que seu negócio utiliza ativamente." />
            </div>

            {/* Grid de Plataformas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SOCIAL_PLATFORMS.map((platform) => (
                <FormField key={platform} control={form.control} name="socialPlatforms" render={({ field }) => {
                  const isChecked = (field.value || []).includes(platform);
                  const checkboxId = `platform-${platform}`;
                  
                  return (
                    <FormItem className="w-full">
                      <label 
                        htmlFor={checkboxId}
                        className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 w-full group ${
                          isChecked 
                            ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary shadow-md scale-[1.02]' 
                            : 'hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200'
                        }`}
                      >
                        <FormControl>
                          <Checkbox 
                            id={checkboxId}
                            checked={isChecked} 
                            onCheckedChange={(checked) => {
                              const current = field.value || []; 
                              if (checked) { 
                                field.onChange([...current, platform]); 
                              } else { 
                                field.onChange(current.filter((p) => p !== platform)); 
                              }
                            }} 
                            className={`h-5 w-5 border-2 transition-all ${
                              isChecked 
                                ? 'bg-primary border-primary' 
                                : 'border-gray-300 group-hover:border-primary/60'
                            }`}
                          />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer text-sm sm:text-base m-0 flex-1">
                          {platform}
                        </FormLabel>
                      </label>
                    </FormItem>
                  );
                }}
                />
              ))}
            </div>
            {form.formState.errors.socialPlatforms && (
              <FormMessage className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                {form.formState.errors.socialPlatforms.message as string}
              </FormMessage>
            )}
          </div>

          {/* Frequência de Postagens */}
          <FormField control={form.control} name="postingFrequency" render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <Send className="h-4 w-4 text-green-600" />
                </div>
                <FormLabel className="text-sm sm:text-base font-semibold">
                  Frequência de Postagens
                </FormLabel>
                <InfoTooltip description="Obrigatório se usar redes sociais. Com que frequência seu negócio publica conteúdo nas redes sociais." />
              </div>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 sm:h-11 border-2 focus:border-primary transition-all text-sm sm:text-base hover:border-primary/60">
                    <SelectValue placeholder="Selecione a frequência de postagens" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover">
                  {POSTING_FREQUENCY_OPTIONS.map(freq => (
                    <SelectItem 
                      key={freq} 
                      value={freq} 
                      className="hover:bg-primary/10 cursor-pointer py-3"
                    >
                      <span className="font-medium text-black/80 dark:text-white">{freq}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-2">
                A frequência ideal depende do seu público e recursos disponíveis
              </p>
              <FormMessage />
            </FormItem>
          )} />
        </>
      )}
      
      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background">
            DESAFIOS
          </span>
        </div>
      </div>

      {/* 3. DESAFIOS */}
      <UICard className="p-4 sm:p-5 border-2 border-orange-200 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-gray-900/50 shadow-md hover:shadow-lg transition-all">
        <FormField control={form.control} name="challenges" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-bold">
                Principais Desafios do Negócio
              </FormLabel>
              <InfoTooltip description="Obrigatório. Descreva os maiores obstáculos que o negócio está enfrentando atualmente (Ex: captação de clientes, retenção, custos). Mínimo 10 caracteres." />
            </div>
            <FormControl>
              <Textarea 
                placeholder="Descreva os principais desafios do seu negócio: captação de clientes, retenção, custos operacionais, concorrência, etc..." 
                className="resize-y border-2 focus:border-orange-500 min-h-[120px] sm:min-h-[140px] transition-all text-sm sm:text-base" 
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
    </div>
  );
}