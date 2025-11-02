import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Globe, Hash, Send, AlertTriangle, Check } from "lucide-react"; 
import type { FormValues } from "../form-schema";

interface StepFiveMarketingProps {
  form: UseFormReturn<FormValues>;
  usesSocialMedia: boolean;
}

const SOCIAL_PLATFORMS = ["Instagram", "Facebook", "TikTok", "WhatsApp Business", "LinkedIn"];
const POSTING_FREQUENCY_OPTIONS = [
  "Diariamente",
  "3x por semana",
  "2x por semana",
  "1x por semana",
  "Casualmente"
];

export function StepFiveMarketing({ form, usesSocialMedia }: StepFiveMarketingProps) {
  const watchedValues = form.watch();
  
  // Verificar se cada campo está preenchido
  const isSocialMediaFilled = watchedValues.usesSocialMedia === true;
  const isPlatformsFilled = watchedValues.socialPlatforms && watchedValues.socialPlatforms.length > 0;
  const isFrequencyFilled = watchedValues.postingFrequency && watchedValues.postingFrequency.length > 0;
  const isChallengesFilled = watchedValues.challenges && watchedValues.challenges.length >= 10;

  return (
    <div className="max-w-[50rem] mx-auto space-y-6">

      {/* 1. TOGGLE DE REDES SOCIAIS */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isSocialMediaFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="usesSocialMedia" render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex items-center gap-3">
              <FormControl>
                <Checkbox 
                  id="uses-social-media"
                  checked={field.value as boolean} 
                  onCheckedChange={field.onChange} 
                  className="h-5 w-5 border-2 transition-all"
                />
              </FormControl>
              <FormLabel 
                htmlFor="uses-social-media" 
                className="text-lg font-semibold flex items-center gap-2 cursor-pointer flex-1"
              >
                <Globe className="h-5 w-5 text-primary" />
                O Negócio Utiliza Redes Sociais?
                <InfoTooltip description="Obrigatório. Marque se o negócio possui presença ativa em redes sociais. Ativar esta opção torna os campos seguintes obrigatórios." />
                {isSocialMediaFilled && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </FormLabel>
            </div>
            <p className="text-sm text-muted-foreground ml-8">
              {isSocialMediaFilled 
                ? 'Configure suas plataformas e frequência de postagens abaixo' 
                : 'Ative para configurar suas plataformas e frequência de postagens'
              }
            </p>
          </FormItem>
        )} />
      </div>

      {/* 2. CAMPOS CONDICIONAIS (Plataformas e Frequência) */}
      {usesSocialMedia && (
        <>
          {/* Plataformas de Redes Sociais */}
          <div className={`p-6 rounded-xl transition-all duration-300 ${isPlatformsFilled ? 'bg-primary/5' : ''}`}>
            <div className="space-y-4">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                Plataformas de Redes Sociais
                <InfoTooltip description="Obrigatório se usar redes sociais. Selecione as plataformas que seu negócio utiliza ativamente." />
                {isPlatformsFilled && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </FormLabel>

              {/* Grid de Plataformas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <FormField key={platform} control={form.control} name="socialPlatforms" render={({ field }) => {
                    const isChecked = (field.value || []).includes(platform);
                    const checkboxId = `platform-${platform}`;
                    
                    return (
                      <FormItem>
                        <label 
                          htmlFor={checkboxId}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            isChecked 
                              ? 'bg-primary/10 border-primary' 
                              : 'border-border/40 hover:border-primary/50 hover:bg-accent/50'
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
                              className="h-5 w-5 border-2"
                            />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer text-base m-0 flex-1">
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
          </div>

          {/* Frequência de Postagens */}
          <div className={`p-6 rounded-xl transition-all duration-300 ${isFrequencyFilled ? 'bg-primary/5' : ''}`}>
            <FormField control={form.control} name="postingFrequency" render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Frequência de Postagens
                  <InfoTooltip description="Obrigatório se usar redes sociais. Com que frequência seu negócio publica conteúdo nas redes sociais." />
                  {isFrequencyFilled && (
                    <div className="ml-auto">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  )}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 text-base border-border/40 focus:border-primary transition-colors">
                      <SelectValue placeholder="Selecione a frequência de postagens" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {POSTING_FREQUENCY_OPTIONS.map(freq => (
                      <SelectItem 
                        key={freq} 
                        value={freq} 
                        className="py-2.5 cursor-pointer"
                      >
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  A frequência ideal depende do seu público e recursos disponíveis
                </p>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </>
      )}

      {/* 3. DESAFIOS */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isChallengesFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="challenges" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Principais Desafios do Negócio
              <InfoTooltip description="Obrigatório. Descreva os maiores obstáculos que o negócio está enfrentando atualmente (Ex: captação de clientes, retenção, custos). Mínimo 10 caracteres." />
              {isChallengesFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva os principais desafios do seu negócio: captação de clientes, retenção, custos operacionais, concorrência, etc..." 
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
    </div>
  );
}