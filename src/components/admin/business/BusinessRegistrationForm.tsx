"use client";
import { useState, useCallback } from "react";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Building2, MapPin, Wifi, DollarSign, CheckCircle2, Clock, ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { formSchema, type FormValues } from "./form-schema";
import { StepOneBasicInfo } from "./steps/step1";
import { StepTwoLocation } from "./steps/step-two-location";
import { StepThreeServices } from "./steps/step-three-services";
import { StepFourFinancial } from "./steps/step-four-financial";
import { StepFiveMarketing } from "./steps/step-five-marketing";
import { StepSixHours } from "./steps/step-six-hours";
import { SuccessMessage } from "./success-message.tsxsuccess-message";
import { createBusiness } from "@/lib/api";
import { useRouter } from "next/navigation";

const FIELDS_BY_STEP: Record<number, ReadonlyArray<keyof FormValues | `location.${keyof FormValues['location']}`>> = {
  1: ["name", "niche", "description", "operatingYears"],
  2: ["location.cep", "location.street", "location.number", "location.city", "location.state", "capacity"],
  3: ["services", "employees"],
  4: ["minServicePrice", "maxServicePrice", "reportFrequency"],
  5: ["challenges", "usesSocialMedia"],
  6: ["businessHours"],
};

export function BusinessRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loadingCep, setLoadingCep] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedBusinessName, setSubmittedBusinessName] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "", description: "", operatingYears: "1-3 anos",
      location: { cep: "", street: "", number: "", city: "", state: "", country: "Brasil" },
      amenities: { airConditioning: false, coffee: false, water: false, wifi: false, parking: false, otherAmenities: "" },
      services: [], employees: 1, revenue: 0, expenses: 0,
      minServicePrice: 1.00, maxServicePrice: 10.00,
      usesSocialMedia: false, socialPlatforms: [], challenges: "", reportFrequency: "mensal",
      capacity: 10, delivery: false, businessHours: [], postingFrequency: "1x por semana",
    },
  });

  const selectedNiche = form.watch("niche");
  const usesSocialMedia = form.watch("usesSocialMedia");

  const fetchAddressByCep = async (cep: string) => {
    if (!cep) return;
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        form.setError("location.cep" as Path<FormValues>, { message: "CEP não encontrado ou inválido" });
        return;
      }

      form.setValue("location.street", data.logradouro || "", { shouldValidate: true, shouldDirty: true });
      form.setValue("location.city", data.localidade || "", { shouldValidate: true, shouldDirty: true });
      form.setValue("location.state", data.uf || "", { shouldValidate: true, shouldDirty: true });
      toast.success("Endereço preenchido automaticamente!");
    } catch {
      toast.error("Erro ao buscar CEP");
    } finally {
      setLoadingCep(false);
    }
  };

  const calculateAveragePrice = useCallback(() => {
    const minRaw = form.watch("minServicePrice");
    const maxRaw = form.watch("maxServicePrice");

    const numMin = parseFloat(String(minRaw)) || 0.00;
    const numMax = parseFloat(String(maxRaw)) || 0.00;

    return numMin >= 0 && numMax >= 0 ? ((numMin + numMax) / 2).toFixed(2) : "0.00";
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    const avgServicePrice = calculateAveragePrice();
    const finalData = { ...data, avgServicePrice: parseFloat(avgServicePrice) };

    const response = await createBusiness(finalData);

    if (response.ok) {
      toast.success("Negócio cadastrado com sucesso!");
      setSubmittedBusinessName(data.name);
      setShowSuccess(true);
    } else {
      toast.error(response.error || "Erro ao cadastrar o negócio.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    form.reset();
    router.push("/dashboard"); // redireciona após fechar a mensagem
  };

  const getFieldsToValidate = (currentStep: number) => {
    const baseFields = FIELDS_BY_STEP[currentStep];
    if (currentStep === 5 && usesSocialMedia) {
      return [...baseFields, "socialPlatforms" as const, "postingFrequency" as const];
    }
    return baseFields;
  };

  const nextStep = () => {
    const fields = getFieldsToValidate(step) as Path<FormValues>[];
    if (step < 6) {
      form.trigger(fields, { shouldFocus: false }).then((isValid) => {
        if (isValid) setStep(step + 1);
        else toast.error("Por favor, preencha os campos obrigatórios desta etapa.");
      });
    }
  };

  const handleFinalSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Por favor, corrija os erros do formulário antes de cadastrar.");
      return;
    }

    await form.handleSubmit(onSubmit)();
  };

  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1: return <StepOneBasicInfo form={form} />;
      case 2: return <StepTwoLocation form={form} fetchAddressByCep={fetchAddressByCep} loadingCep={loadingCep} />;
      case 3: return <StepThreeServices form={form} selectedNiche={selectedNiche} />;
      case 4: return <StepFourFinancial form={form} calculateAveragePrice={calculateAveragePrice} />;
      case 5: return <StepFiveMarketing form={form} usesSocialMedia={usesSocialMedia} />;
      case 6: return <StepSixHours form={form} />;
      default: return <StepOneBasicInfo form={form} />;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return { title: "Informações Básicas", icon: <Building2 className="h-7 w-7 text-primary" /> };
      case 2: return { title: "Localização", icon: <MapPin className="h-7 w-7 text-primary" /> };
      case 3: return { title: "Serviços e Comodidades", icon: <Wifi className="h-7 w-7 text-primary" /> };
      case 4: return { title: "Informações Financeiras", icon: <DollarSign className="h-7 w-7 text-primary" /> };
      case 5: return { title: "Marketing e Desafios", icon: <Building2 className="h-7 w-7 text-primary" /> };
      case 6: return { title: "Horário de Funcionamento", icon: <Clock className="h-7 w-7 text-primary" /> };
      default: return { title: "Cadastro de Negócio", icon: <Building2 className="h-7 w-7 text-primary" /> };
    }
  };

  const { title, icon } = getStepTitle();

  return (
    <>
      <div className="min-h-screen py-4">
        <div className="max-w-4xl mx-auto md:py-6">
          <div className="text-center mb-8 space-y-3">
            <div className="inline-block animate-bounce">
              <Building2 className="h-16 w-16 text-primary mx-auto mb-2" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mt-4 text-black/80 dark:text-white">Cadastro de Negócio</h1>
            <p className="text-muted-foreground text-md">Preencha as informações do seu negócio e comece a gerenciar melhor</p>
          </div>
          <div className="mb-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all duration-500 ${s === step ? "bg-primary w-20 shadow-lg shadow-primary/50" : s < step ? "bg-primary/60 w-16" : "bg-muted w-12"}`} />
            ))}
          </div>

          <Card className="shadow-2xl border-2 border-border/50 backdrop-blur-sm overflow-hidden">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">{icon} {title}</CardTitle>
                  <CardDescription className="text-base">Etapa {step} de 6 - {Math.round((step / 6) * 100)}% concluído</CardDescription>
                </CardHeader>

                <CardContent className="pt-6">{renderStep()}</CardContent>

                <CardContent className="flex gap-3 pt-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12 text-base border-2 hover:border-primary">
                      <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
                    </Button>
                  )}
                  {step < 6 ? (
                    <Button type="button" onClick={nextStep} className="flex-1 h-12 text-base bg-primary hover:bg-primary/90">Próximo <span><ArrowRight className="ml-2 h-5 w-5" /></span></Button>
                  ) : (
                    <Button type="button" onClick={handleFinalSubmit} className="flex items-center justify-center h-12 text-base bg-primary hover:bg-primary/90 font-semibold">
                      <CheckCircle2 className="mr-2 h-5 w-5" /> Cadastrar Negócio
                    </Button>
                  )}
                </CardContent>
              </form>
            </Form>
          </Card>
        </div>
      </div>

      {showSuccess && <SuccessMessage businessName={submittedBusinessName} onClose={handleCloseSuccess} />}
    </>
  );
}
