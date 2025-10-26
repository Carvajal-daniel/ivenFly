import { UseFormReturn, Path } from "react-hook-form";
import { Sparkles, Users, ShoppingCart, AirVent, Coffee, Droplet, Wifi, Car, ListPlus, Briefcase } from "lucide-react"; 
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Card as UICard } from "@/components/ui/card"; 
import { ServicesSelector } from "../services-selector";
import type { FormValues } from "../form-schema";
import { FOOD_CLOTHING_NICHES } from "../constants";

interface StepThreeServicesProps {
  form: UseFormReturn<FormValues>;
  selectedNiche: string;
}

type AmenityKey = keyof FormValues["amenities"];

const AMENITIES_LIST = [
    { name: "airConditioning" as AmenityKey, label: "Ar Condicionado", desc: "Ambiente climatizado", icon: AirVent }, 
    { name: "coffee" as AmenityKey, label: "Café Cortesia", desc: "Bebidas de cortesia", icon: Coffee },
    { name: "water" as AmenityKey, label: "Água", desc: "Água disponível", icon: Droplet }, 
    { name: "wifi" as AmenityKey, label: "WiFi Grátis", desc: "Internet sem fio", icon: Wifi }, 
    { name: "parking" as AmenityKey, label: "Estacionamento", desc: "Vaga disponível", icon: Car },
] as const;

export function StepThreeServices({ form, selectedNiche }: StepThreeServicesProps) {
  const showDelivery = selectedNiche && FOOD_CLOTHING_NICHES.includes(selectedNiche);
    
  return (
    <div className="space-y-8">
      
      {/* 1. SELEÇÃO DE SERVIÇOS/PRODUTOS */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
              Serviços e Produtos
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Defina o que você oferece aos seus clientes
            </p>
          </div>
        </div>
        
        <UICard className="p-4 sm:p-6 border-2 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
          <ServicesSelector form={form} niche={selectedNiche} />
        </UICard>
      </div>

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background dark:bg-primary rounded-2xl">
            EXPERIÊNCIA DO CLIENTE
          </span>
        </div>
      </div>

      {/* 2. COMODIDADES */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
          <div className="p-2 bg-gradient-to-br from-amber-100 to-primary/10 rounded-lg dark:bg-gradient-to-br dark:from-amber-900/20 dark:to-primary/10">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
              Comodidades Oferecidas
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Selecione as conveniências disponíveis
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {AMENITIES_LIST.map((amenity) => {
            const Icon = amenity.icon;
            const fieldName = `amenities.${amenity.name}` as Path<FormValues>;
            
            return (
              <FormField 
                key={amenity.name} 
                control={form.control} 
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <label 
                      htmlFor={amenity.name} 
                      className={`flex flex-col justify-between p-4 rounded-xl border-2 cursor-pointer relative w-full min-h-[110px] sm:min-h-[120px]
                                  transition-all duration-300 group
                                  ${field.value 
                                    ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary shadow-md scale-[1.02] ' 
                                    : 'hover:bg-gray-50 hover:border-primary/40 dark:hover:bg-gray-800 border-gray-200 hover:scale-[1.01]'
                                  }`}
                    >
                      {/* Checkbox */}
                      <FormControl className="absolute top-3 right-3 z-10">
                        <Checkbox 
                          id={amenity.name}
                          onCheckedChange={field.onChange} 
                          className={`h-5 w-5 border-2 transition-all
                            ${field.value 
                              ? 'bg-primary border-primary' 
                              : 'border-gray-300 group-hover:border-primary/60'
                            }`}
                        />
                      </FormControl>
                      
                      {/* Conteúdo */}
                      <div className="flex flex-col space-y-2 mt-auto pr-8">
                        <div className={`p-2 rounded-lg w-fit transition-colors ${
                          field.value 
                            ? 'bg-primary/20' 
                            : 'bg-gray-100 group-hover:bg-primary/10'
                        }`}>
                          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                            field.value ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
                          }`} />
                        </div>
                        <div>
                          <FormLabel className="font-bold text-sm sm:text-base cursor-pointer block">
                            {amenity.label}
                          </FormLabel>
                          <p className="text-xs text-gray-500 mt-0.5">{amenity.desc}</p>
                        </div>
                      </div>
                    </label>
                  </FormItem>
                )}
              />
            );
          })}
        </div>
      </div>
      
      {/* Outras Comodidades */}
      <FormField control={form.control} name="amenities.otherAmenities" render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <ListPlus className="h-4 w-4 text-primary" />
            </div>
            <FormLabel className="text-sm sm:text-base font-semibold">
              Outras Comodidades
            </FormLabel>
            <InfoTooltip description="Opcional. Quaisquer outras comodidades não listadas que o seu negócio oferece." />
          </div>
          <FormControl>
            <Input 
              placeholder="Ex: Revistas, Jogos de Mesa, Música ao Vivo (separadas por vírgula)" 
              {...field} 
              className="h-10 sm:h-11 border-2 focus:border-primary transition-all text-sm sm:text-base" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Divisor Visual */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-xs font-semibold text-gray-500 bg-background dark:bg-primary rounded-2xl">
            OPERAÇÃO
          </span>
        </div>
      </div>

      {/* 3. INFORMAÇÕES DE OPERAÇÃO */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-primary/10 rounded-lg dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-primary/10">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 " />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
              Detalhes Operacionais
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Informações sobre sua equipe e serviços
            </p>
          </div>
        </div>
        
        {/* Número de Funcionários */}
        <FormField control={form.control} name="employees" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <FormLabel className="text-sm sm:text-base font-semibold">
                Número de Funcionários
              </FormLabel>
              <InfoTooltip description="Obrigatório. Total de colaboradores, incluindo o proprietário, se aplicável." />
            </div>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Ex: 5"
                min={1}
                {...field} 
                value={field.value !== undefined ? field.value.toString() : ''} 
                onChange={(e) => field.onChange(Number(e.target.value))} 
                className="h-10 sm:h-11 border-2 focus:border-primary transition-all text-sm sm:text-base" 
              />
            </FormControl>
            <p className="text-xs text-gray-500 mt-1">
              Inclua todos os colaboradores, incluindo o proprietário
            </p>
            <FormMessage />
          </FormItem>
        )} />

        {/* Delivery Condicional */}
        {showDelivery && (
          <FormField control={form.control} name="delivery" render={({ field }) => (
            <FormItem>
              <label 
                htmlFor="delivery-checkbox"
                className={`flex items-start gap-4 rounded-xl border-2 p-4 sm:p-5 transition-all cursor-pointer w-full group
                  ${field.value 
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-50/50 shadow-lg scale-[1.01]' 
                    : 'hover:border-green-400 hover:bg-green-50/30 border-gray-200'
                  }`}
              >
                <FormControl>
                  <Checkbox 
                    id="delivery-checkbox"
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    className={`mt-1 h-5 w-5 border-2 shrink-0 transition-all
                      ${field.value 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 group-hover:border-green-400'
                      }`}
                  />
                </FormControl>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      field.value ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-100'
                    }`}>
                      <ShoppingCart className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                        field.value ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
                      }`} />
                    </div>
                    <FormLabel className="font-bold cursor-pointer text-sm sm:text-base">
                      Oferece Entrega/Delivery
                    </FormLabel>
                  </div>
                  <p className={`text-xs sm:text-sm transition-colors ${
                    field.value ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
                  }`}>
                    Marque se você possui serviços próprios ou utiliza aplicativos de entrega
                  </p>
                </div>
              </label>
              <FormMessage />
            </FormItem>
          )}
          />
        )}
      </div>
    </div>
  );
}
