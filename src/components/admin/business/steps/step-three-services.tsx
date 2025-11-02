import { UseFormReturn, Path } from "react-hook-form";
import { Sparkles, Users, ShoppingCart, AirVent, Coffee, Droplet, Wifi, Car, ListPlus, Briefcase, Check } from "lucide-react"; 
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoTooltip } from "@/components/ui/info-tooltip";
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
  const watchedValues = form.watch();
  
  // Verificar se serviços estão preenchidos (assumindo que o ServicesSelector preenche um campo)
  const isServicesFilledValue = watchedValues.services;
  const isServicesFilled = Array.isArray(isServicesFilledValue) ? isServicesFilledValue.length > 0 : false;
  
  // Verificar amenidades
  const hasAnyAmenity = AMENITIES_LIST.some(a => watchedValues.amenities?.[a.name]);
  const isOtherAmenitiesFilled = watchedValues.amenities?.otherAmenities && watchedValues.amenities.otherAmenities.length > 0;
  const isAmenitiesFilled = hasAnyAmenity || isOtherAmenitiesFilled;
  
  const isEmployeesFilled = watchedValues.employees !== undefined && watchedValues.employees !== null && watchedValues.employees > 0;
  const isDeliveryFilled = watchedValues.delivery !== undefined;
    
  return (
    <div className="max-w-[50rem] mx-auto space-y-6">
      
      {/* Serviços e Produtos */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isServicesFilled ? 'bg-primary/5' : ''}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Serviços e Produtos</h3>
            {isServicesFilled && (
              <div className="ml-auto">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            )}
          </div>
          <ServicesSelector form={form} niche={selectedNiche} />
        </div>
      </div>

      {/* Comodidades */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isAmenitiesFilled ? 'bg-primary/5' : ''}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Comodidades Oferecidas</h3>
            {isAmenitiesFilled && (
              <div className="ml-auto">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                                    ${field.value 
                                      ? 'bg-primary/10 border-primary' 
                                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-border/40'
                                    }`}
                      >
                        <Icon className={`h-5 w-5 ${field.value ? 'text-primary' : 'text-gray-500'}`} />
                        
                        <div className="flex-1">
                          <FormLabel className="font-semibold text-sm cursor-pointer">
                            {amenity.label}
                          </FormLabel>
                        </div>
                        
                        <FormControl>
                          <Checkbox 
                            id={amenity.name}
                            onCheckedChange={field.onChange} 
                            className="h-5 w-5"
                          />
                        </FormControl>
                      </label>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>

          {/* Outras Comodidades */}
          <FormField control={form.control} name="amenities.otherAmenities" render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                <ListPlus className="h-5 w-5 text-primary" />
                Outras Comodidades
                <InfoTooltip description="Opcional. Quaisquer outras comodidades não listadas." />
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Revistas, Jogos de Mesa (separadas por vírgula)" 
                  {...field} 
                  className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* Número de Funcionários */}
      <div className={`p-6 rounded-xl transition-all duration-300 ${isEmployeesFilled ? 'bg-primary/5' : ''}`}>
        <FormField control={form.control} name="employees" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Número de Funcionários
              <InfoTooltip description="Total de colaboradores, incluindo o proprietário." />
              {isEmployeesFilled && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Ex: 5"
                min={1}
                {...field} 
                value={field.value !== undefined ? field.value.toString() : ''} 
                onChange={(e) => field.onChange(Number(e.target.value))} 
                className="h-12 text-base border-border/40 focus:border-primary transition-colors" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      {/* Delivery Condicional */}
      {showDelivery && (
        <div className={`p-6 rounded-xl transition-all duration-300 ${isDeliveryFilled && watchedValues.delivery ? 'bg-primary/5' : ''}`}>
          <FormField control={form.control} name="delivery" render={({ field }) => (
            <FormItem>
              <label 
                htmlFor="delivery-checkbox"
                className="flex items-center gap-3 cursor-pointer"
              >
                <FormControl>
                  <Checkbox 
                    id="delivery-checkbox"
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    className="h-5 w-5"
                  />
                </FormControl>
                <div className="flex items-center gap-2 flex-1">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <FormLabel className="text-lg font-semibold cursor-pointer">
                    Oferece Entrega/Delivery
                  </FormLabel>
                  <InfoTooltip description="Marque se possui serviços próprios ou utiliza aplicativos de entrega." />
                </div>
                {field.value && (
                  <Check className="h-5 w-5 text-green-600" />
                )}
              </label>
              <FormMessage />
            </FormItem>
          )}
          />
        </div>
      )}
    </div>
  );
}