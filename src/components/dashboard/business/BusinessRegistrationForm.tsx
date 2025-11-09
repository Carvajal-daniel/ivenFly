
"use client";
import { useState, useCallback } from "react";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Building2,
  MapPin,
  Wifi,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2, // spinner
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { formSchema, type FormValues } from "./form-schema";
import { StepOneBasicInfo } from "./steps/step-one-basic";
import { StepTwoLocation } from "./steps/step-two-location";
import { StepThreeServices } from "./steps/step-three-services";
import { StepFourFinancial } from "./steps/step-four-financial";
import { StepFiveMarketing } from "./steps/step-five-marketing";
import { StepSixHours } from "./steps/step-six-hours";
import { createBusiness } from "@/lib/api";
import { useRouter } from "next/navigation";
import { SuccessMessage } from "./success-message";
import { ConfirmationDialog } from "./ConfirmationDioalog"; 
import ErrorDialog from "@/components/ErrorDialog";

const FIELDS_BY_STEP: Record<
  number,
  ReadonlyArray<keyof FormValues | `location.${keyof FormValues["location"]}`>
> = {
  1: ["name", "niche", "description", "operatingYears"],
  2: [
    "location.cep",
    "location.street",
    "location.number",
    "location.city",
    "location.state",
    "capacity",
  ],
  3: ["services", "employees"],
  4: ["minServicePrice", "maxServicePrice", "reportFrequency"],
  5: ["challenges", "usesSocialMedia"],
  6: ["businessHours"],
};

const STEP_ICONS = [Building2, MapPin, Wifi, DollarSign, Sparkles, Clock];

export function BusinessRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loadingCep, setLoadingCep] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedBusinessName, setSubmittedBusinessName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // estado do dialog de erro
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    title?: string;
    message: string;
  }>({ open: false, title: "Limite Atingido", message: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      operatingYears: "1-3 anos",
      location: {
        cep: "",
        street: "",
        number: "",
        city: "",
        state: "",
        country: "Brasil",
      },
      amenities: {
        airConditioning: false,
        coffee: false,
        water: false,
        wifi: false,
        parking: false,
        otherAmenities: "",
      },
      services: [],
      employees: 1,
      revenue: 0,
      expenses: 0,
      minServicePrice: 1.0,
      maxServicePrice: 10.0,
      usesSocialMedia: false,
      socialPlatforms: [],
      challenges: "",
      reportFrequency: "mensal",
      capacity: 10,
      delivery: false,
      businessHours: [],
      postingFrequency: "1x por semana",
    },
  });

  const selectedNiche = form.watch("niche");
  const usesSocialMedia = form.watch("usesSocialMedia");

  // Busca CEP
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
        form.setError("location.cep" as Path<FormValues>, {
          message: "CEP não encontrado ou inválido",
        });
        return;
      }

      form.setValue("location.street", data.logradouro || "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("location.city", data.localidade || "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("location.state", data.uf || "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast.success("Endereço preenchido automaticamente!");
    } catch {
      toast.error("Erro ao buscar CEP");
    } finally {
      setLoadingCep(false);
    }
  };

  // Preço médio
  const calculateAveragePrice = useCallback(() => {
    const minRaw = form.watch("minServicePrice");
    const maxRaw = form.watch("maxServicePrice");
    const numMin = parseFloat(String(minRaw)) || 0.0;
    const numMax = parseFloat(String(maxRaw)) || 0.0;
    return numMin >= 0 && numMax >= 0
      ? ((numMin + numMax) / 2).toFixed(2)
      : "0.00";
  }, [form]);

  // Submit final
  const onSubmit = async (data: FormValues) => {
    const avgServicePrice = calculateAveragePrice();
    const finalData = { ...data, avgServicePrice: parseFloat(avgServicePrice) };

    const response = await createBusiness(finalData);

    if (response.ok) {
      toast.success("Negócio cadastrado com sucesso!");
      setSubmittedBusinessName(data.name);
      setShowSuccess(true);
      return;
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Na falha: se a mensagem indicar LIMITE, abre Dialog. Caso contrário, mantém toast.
    const msg = response.error || "Erro ao cadastrar o negócio.";
    const normalized = msg.toLowerCase();

    const isLimitExceeded =
      normalized.includes("limite") ||
      normalized.includes("excedido") ||
      normalized.includes("atingido") ||
      normalized.includes("quota") ||
      normalized.includes("quota excedida") ||
      normalized.includes("rate limit");

    if (isLimitExceeded) {
      setErrorDialog({
        open: true,
        title: "Limite Atingido",
        message: msg,
      });
    } else {
      toast.error(msg);
    }
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    form.reset();
    router.push("/dashboard");
  };

  const getFieldsToValidate = (currentStep: number) => {
    const baseFields = FIELDS_BY_STEP[currentStep];
    if (currentStep === 5 && usesSocialMedia) {
      return [
        ...baseFields,
        "socialPlatforms" as const,
        "postingFrequency" as const,
      ];
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
    setShowConfirm(true);
  };

  // controla estado de envio durante a confirmação
  const confirmAndSubmit = async () => {
    if (isSubmitting) return; // evita clique duplo
    setIsSubmitting(true);
    setShowConfirm(false);
    try {
      await form.handleSubmit(onSubmit)();
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOneBasicInfo form={form} />;
      case 2:
        return (
          <StepTwoLocation
            form={form}
            fetchAddressByCep={fetchAddressByCep}
            loadingCep={loadingCep}
          />
        );
      case 3:
        return <StepThreeServices form={form} selectedNiche={selectedNiche} />;
      case 4:
        return (
          <StepFourFinancial
            form={form}
            calculateAveragePrice={calculateAveragePrice}
          />
        );
      case 5:
        return (
          <StepFiveMarketing form={form} usesSocialMedia={usesSocialMedia} />
        );
      case 6:
        return <StepSixHours form={form} />;
      default:
        return <StepOneBasicInfo form={form} />;
    }
  };

  return (
    <>
      <div className="py-1">
        <div className="max-w-5xl mx-auto">
          <Card className="w-full shadow-2xl md:mt-40 mt-30">
            <Form {...form}>
              <form>
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">Cadastro</CardTitle>

                    <div className="flex gap-1.5">
                      {STEP_ICONS.map((Icon, idx) => {
                        const stepNum = idx + 1;
                        const isActive = stepNum === step;
                        const isCompleted = stepNum < step;

                        return (
                          <button
                            key={stepNum}
                            type="button"
                            onClick={() => stepNum <= step && setStep(stepNum)}
                            disabled={stepNum > step || isSubmitting}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-white scale-110 shadow-lg"
                                : isCompleted
                                ? "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                            aria-current={isActive ? "step" : undefined}
                            aria-label={`Etapa ${stepNum}`}
                          >
                            <Icon className="h-5 w-5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-8">{renderStep()}</CardContent>

                <CardFooter className="gap-3 border-t py-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1 h-11"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Button>
                  )}

                  {step < 6 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className={`h-11 ${step === 1 ? "w-full" : "flex-1"}`}
                      disabled={isSubmitting}
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="flex-1 h-11"
                      disabled={isSubmitting}
                      aria-live="polite"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Finalizar
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>

      {/* Diálogo de confirmação */}
      <ConfirmationDialog
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        confirmAndSubmit={confirmAndSubmit}
        formValues={form.watch()}
        calculateAveragePrice={calculateAveragePrice}
      />

      {/* Sucesso */}
      {showSuccess && (
        <SuccessMessage
          businessName={submittedBusinessName}
          onClose={handleCloseSuccess}
        />
      )}

      {/* Erro crítico (ex.: limite excedido) */}
      <ErrorDialog
        open={errorDialog.open}
        onClose={() => setErrorDialog((s) => ({ ...s, open: false }))}
        title={errorDialog.title}
        message={errorDialog.message}
      />
    </>
  );
}
