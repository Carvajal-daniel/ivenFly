import { useState } from "react";
import { toast } from "sonner";
import { BusinessData, INITIAL_FORM_DATA, TOTAL_STEPS, type Address } from "./BusinessInterfaces"; 
import { createBusiness } from "@/lib/api/business";

export const useQuestionnaireState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<BusinessData>(INITIAL_FORM_DATA);

  // ⭐️ CORREÇÃO: Tipagem para evitar 'any' no valor, usando 'unknown' e type casting ⭐️
  const updateField = (field: keyof BusinessData, value: unknown) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: field === 'address' 
        ? { ...prev.address, ...(value as Partial<Address>) } // Type assertion para garantir o tipo Address
        : value 
    }));
  };

  const resetForm = () => {
    setIsCompleted(false);
    setCurrentStep(0);
    setFormData(INITIAL_FORM_DATA);
  };

  const validateCurrentStep = (step: number, data: BusinessData): boolean => {
    switch (step) {
      case 0:
        return data.name.trim().length > 0;
      case 1:
        return data.niche.trim().length > 0;
      case 2:
        return data.address.cep.length === 8 && 
               data.address.localidade.length > 0 &&
               data.address.numero.trim().length > 0;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return data.minServicePrice !== undefined && 
               data.maxServicePrice !== undefined && 
               data.minServicePrice > 0 && 
               data.maxServicePrice > 0 &&
               data.minServicePrice <= data.maxServicePrice;
      case 6:
        return data.services.length > 0;
      case 7:
        return data.employees !== undefined && data.employees >= 0; 
      case 8:
        return data.hours.length > 0;
      case 9:
        return true;
      case 10:
        return !data.usesSocialMedia || data.socialPlatforms.length > 0;
      case 11:
        return data.challenges.trim().length > 0;
      case 12:
        return data.reportFrequency.trim().length > 0;
      default:
        return true;
    }
  };


  const handleComplete = async (dataToSubmit: BusinessData) => { 
      // 1. Envio dos dados
      const result = await createBusiness(dataToSubmit); 

      if (!result) {
          console.error("❌ Falha crítica: createBusiness retornou undefined.");
          toast.error("Falha na comunicação com o servidor.");
          return;
      }
      
      const { ok, data } = result;

      if (ok) {
          console.log("✅ Dados do Negócio enviados com sucesso:", dataToSubmit);
          
          // ⭐️ CORREÇÃO: Uso de 'window' isolado ⭐️
          if (typeof window !== 'undefined') {
             // Tipagem para acesso seguro no ambiente de navegador
             (window as unknown as { businessData: BusinessData }).businessData = dataToSubmit;
          }
          
          toast.success("Questionário concluído e dados enviados com sucesso!");
          setIsCompleted(true);
      } else {
          console.error("❌ Erro ao enviar dados:", data);
          
          // 🛑 Detecção do Erro de Sessão/Validação Ausente
          if (data.message && typeof data.message === 'string' && data.message.includes('Erro ao criar negócio')) {
             toast.error("Parece que a sua sessão expirou ou o formulário não foi totalmente preenchido. Por favor, preencha todos os campos obrigatórios e tente novamente.");
          } else {
             toast.error(data.message || "Falha ao concluir o questionário e enviar os dados.");
          }
          // Não marca como concluído se falhar
      }
  };

  const handleNext = async () => {
      // 1. Validação do Passo Atual (Crucial!)
      if (!validateCurrentStep(currentStep, formData)) {
        toast.error("Por favor, preencha o(s) campo(s) obrigatório(s) antes de continuar.");
        return;
      }

      if (currentStep < TOTAL_STEPS) {
        setCurrentStep((prev) => prev + 1);
      } else {
        await handleComplete(formData); 
      }
  };


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / (TOTAL_STEPS + 1)) * 100;

  return {
    currentStep,
    isCompleted,
    formData,
    progress,
    updateField,
    handleNext,
    handleBack,
    resetForm,
    TOTAL_STEPS
  };
};