"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import {
  Building2,
  Layers,
  PencilLine,
  Clock,
  Check,
  PlusCircle,
  Eraser,
} from "lucide-react";
import type { FormValues } from "../form-schema";
import { NICHES as NICHES_BASE } from "../constants";

interface StepOneBasicInfoProps {
  form: UseFormReturn<FormValues>;
}

export function StepOneBasicInfo({ form }: StepOneBasicInfoProps) {
  // sugestões de nicho (mutable copy para permitir inserir custom)
  const [nicheOptions, setNicheOptions] = useState<string[]>(() => [...NICHES_BASE]);

  const watched = form.watch();
  const isNameFilled = !!watched.name?.length;
  const isNicheFilled = !!watched.niche?.length;
  const isDescriptionFilled = (watched.description?.length || 0) >= 10;
  const isOperatingYearsFilled = !!watched.operatingYears?.length;

  const pushUnique = (arr: string[], v: string) => {
    const val = v.trim();
    if (!val) return arr;
    return arr.some((n) => n.toLowerCase() === val.toLowerCase()) ? arr : [...arr, val];
  };

  const nicheError = !!form.formState.errors.niche;
  const nameError = !!form.formState.errors.name;
  const descError = !!form.formState.errors.description;
  const yearsError = !!form.formState.errors.operatingYears;

  return (
    <div className="max-w-[50rem] mx-auto space-y-3">
      {/* Nome do Negócio (required) */}
      <div className={`p-4 rounded-xl transition-all duration-300 ${isNameFilled ? "bg-primary/5" : ""}`}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Nome do Negócio
                <span className="text-red-500" aria-hidden="true">*</span>
                <InfoTooltip description="O nome oficial ou comercial do seu estabelecimento." />
                {isNameFilled && !nameError && <Check className="ml-auto h-5 w-5 text-green-600" />}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Uplys Tech Solutions"
                  {...field}
                  required
                  aria-required="true"
                  aria-invalid={nameError || undefined}
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Nicho de Mercado (required) — input livre + datalist + atalhos */}
      <div className={`p-4 rounded-xl transition-all duration-300 ${isNicheFilled ? "bg-primary/5" : ""}`}>
        <FormField
          control={form.control}
          name="niche"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Nicho de Mercado
                <span className="text-red-500" aria-hidden="true">*</span>
                <InfoTooltip description="Digite livremente, escolha um atalho abaixo ou selecione na lista." />
                {isNicheFilled && !nicheError && <Check className="ml-auto h-5 w-5 text-green-600" />}
              </FormLabel>

              <FormControl>
                <div className="flex gap-2">
                  <input
                    list="niches-suggestions"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      field.onChange(e.target.value); // seleciona na hora
                    }}
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      if (!val) return;
                      setNicheOptions((prev) => pushUnique(prev, val));
                    }}
                    placeholder="Ex.: Barbearia Premium"
                    required
                    aria-required="true"
                    aria-invalid={nicheError || undefined}
                    className="h-12 w-full rounded-md border border-border/40 dark:bg-gray-400/10 px-3 text-base outline-none focus:border-primary transition-colors"
                  />

                  {!!field.value && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={() => field.onChange("")}
                      title="Limpar nicho"
                    >
                      <Eraser className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </FormControl>

              <datalist id="niches-suggestions">
                {nicheOptions.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>

              <div className="flex flex-wrap gap-2 pt-1">
                {nicheOptions.slice(0, 8).map((n) => {
                  const selected = (field.value ?? "").toString().toLowerCase() === n.toLowerCase();
                  return (
                    <Button
                      key={n}
                      type="button"
                      variant={selected ? "default" : "outline"}
                      className="h-9 rounded-full"
                      onClick={() => field.onChange(n)}
                      title={`Selecionar ${n}`}
                    >
                      {n}
                    </Button>
                  );
                })}
                {field.value &&
                  !nicheOptions.some(
                    (n) => n.toLowerCase() === String(field.value).toLowerCase()
                  ) && (
                    <Button
                      type="button"
                      className="h-9 rounded-full"
                      onClick={() =>
                        setNicheOptions((prev) => pushUnique(prev, String(field.value)))
                      }
                      title="Adicionar este nicho às sugestões"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar “{String(field.value)}”
                    </Button>
                  )}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Descrição do Negócio (required) */}
      <div className={`p-4 rounded-xl transition-all duration-300 ${isDescriptionFilled ? "bg-primary/5" : ""}`}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <PencilLine className="h-5 w-5 text-primary" />
                Descrição do Negócio
                <span className="text-red-500" aria-hidden="true">*</span>
                <InfoTooltip description="Uma breve descrição do seu negócio e seus diferenciais." />
                {isDescriptionFilled && !descError && <Check className="ml-auto h-5 w-5 text-green-600" />}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva seu negócio, o que oferece e seu público-alvo..."
                  required
                  aria-required="true"
                  aria-invalid={descError || undefined}
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
          )}
        />
      </div>

      {/* Tempo de Operação (required) — valores do backend */}
      <div className={`p-4 rounded-xl transition-all duration-300 ${isOperatingYearsFilled ? "bg-primary/5" : ""}`}>
        <FormField
          control={form.control}
          name="operatingYears"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Tempo de Operação
                <span className="text-red-500" aria-hidden="true">*</span>
                <InfoTooltip description="Há quanto tempo o negócio está em atividade." />
                {isOperatingYearsFilled && !yearsError && <Check className="ml-auto h-5 w-5 text-green-600" />}
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(v) => {
                  // garante que só um dos 3 valores vá para o form (alinhado ao schema/backend)
                  const allowed = ["menos de 1 ano", "1-3 anos", "+3 anos"] as const;
                  const normalized = (allowed as readonly string[]).includes(v) ? v : "+3 anos";
                  field.onChange(normalized);
                }}
              >
                <FormControl>
                  {/* SelectTrigger não suporta `required`; usamos ARIA */}
                  <SelectTrigger
                    className="h-12 text-base border-border/40 focus:border-primary transition-colors"
                    aria-required="true"
                    aria-invalid={yearsError || undefined}
                  >
                    <SelectValue placeholder="Selecione o tempo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="menos de 1 ano" className="py-2.5 cursor-pointer">
                    menos de 1 ano
                  </SelectItem>
                  <SelectItem value="1-3 anos" className="py-2.5 cursor-pointer">
                    1-3 anos
                  </SelectItem>
                  <SelectItem value="+3 anos" className="py-2.5 cursor-pointer">
                    +3 anos
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
