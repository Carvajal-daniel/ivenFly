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
  Briefcase,
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { formSchema, type FormValues } from "./form-schema";
import { StepOneBasicInfo } from "./steps/step-one-basic";
import { StepTwoLocation } from "./steps/step-two-location";
import { StepThreeServices } from "./steps/step-three-services";
import { StepFourFinancial } from "./steps/step-four-financial";
import { StepFiveMarketing } from "./steps/step-five-marketing";
import { StepSixHours } from "./steps/step-six-hours";
import { createBusiness } from "@/lib/api";
import { useRouter } from "next/navigation";
import { SuccessMessage } from "./success-message.tsxsuccess-message";

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

  const calculateAveragePrice = useCallback(() => {
    const minRaw = form.watch("minServicePrice");
    const maxRaw = form.watch("maxServicePrice");
    const numMin = parseFloat(String(minRaw)) || 0.0;
    const numMax = parseFloat(String(maxRaw)) || 0.0;
    return numMin >= 0 && numMax >= 0
      ? ((numMin + numMax) / 2).toFixed(2)
      : "0.00";
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

  const confirmAndSubmit = async () => {
    setShowConfirm(false);
    await form.handleSubmit(onSubmit)();
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

  // dados do resumo (para o diálogo)
  const v = form.watch();
  const avg = Number(calculateAveragePrice());
  const amenityList = Object.entries(v.amenities || {})
    .filter(([_, val]) => (typeof val === "boolean" ? val : Boolean(val)))
    .map(([k]) => k);

  const sections = [
    {
      icon: Building2,
      title: "Informações Básicas",
      items: [
        { label: "Nome", value: v.name },
        { label: "Nicho", value: v.niche },
        { label: "Descrição", value: v.description },
        { label: "Tempo de operação", value: v.operatingYears },
      ],
    },
    {
      icon: MapPin,
      title: "Localização",
      items: [
        {
          label: "Endereço",
          value: [
            v.location?.street,
            v.location?.number,
            v.location?.city,
            v.location?.state,
            v.location?.cep,
          ]
            .filter(Boolean)
            .join(", "),
        },
        {
          label: "Capacidade",
          value: v.capacity ? `${v.capacity} pessoas` : "—",
        },
      ],
    },
    {
      icon: Briefcase,
      title: "Serviços & Equipe",
      items: [
        { label: "Serviços", value: `${v.services?.length || 0} selecionado(s)` },
        { label: "Funcionários", value: v.employees },
        {
          label: "Comodidades",
          value: amenityList.length ? amenityList.join(", ") : "Nenhuma",
        },
      ],
    },
    {
      icon: DollarSign,
      title: "Financeiro",
      items: [
        {
          label: "Preço mínimo",
          value: `R$ ${Number(v.minServicePrice || 0).toFixed(2)}`,
        },
        {
          label: "Preço máximo",
          value: `R$ ${Number(v.maxServicePrice || 0).toFixed(2)}`,
        },
        { label: "Preço médio", value: `R$ ${avg.toFixed(2)}` },
        { label: "Relatórios", value: v.reportFrequency },
      ],
    },
    {
      icon: Sparkles,
      title: "Marketing",
      items: [
        { label: "Redes sociais", value: v.usesSocialMedia ? "Sim" : "Não" },
        ...(v.usesSocialMedia
          ? [
              {
                label: "Plataformas",
                value: v.socialPlatforms?.join(", ") || "—",
              },
              { label: "Frequência", value: v.postingFrequency },
            ]
          : []),
        { label: "Desafios", value: v.challenges },
      ],
    },
    {
      icon: Clock,
      title: "Horários",
      items: [
        {
          label: "Funcionamento",
          value: v.businessHours?.length
            ? `${v.businessHours.length} período(s) configurado(s)`
            : "Não configurado",
        },
      ],
    },
  ];

  return (
    <>
      {/* Página fluida, sem travar altura/overflow */}
      <div className=" py-1">
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
                            disabled={stepNum > step}
                            className={`p-2.5 rounded-lg transition-all duration-200 ${
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
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="flex-1 h-11"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Finalizar
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>

      {/* DIÁLOGO DE CONFIRMAÇÃO — responsivo, duas colunas no desktop, header/footer fixos, scroll interno adequado ao mobile */}
     {/* Diálogo de Confirmação — footer fixo no rodapé do modal */}
<Dialog open={showConfirm} onOpenChange={setShowConfirm}>
  <DialogContent
    className="
      w-[calc(100vw-2rem)]
      sm:max-w-lg
      md:max-w-2xl
      lg:max-w-4xl
      xl:max-w-5xl
      p-0
      flex flex-col
      max-h-[85dvh]
    "
  >
    {/* Header normal */}
    <DialogHeader className="p-6 border-b">
      <DialogTitle className="text-2xl font-bold flex items-center gap-2">
        <CheckCircle2 className="h-6 w-6 text-primary" />
        Confirmar Cadastro
      </DialogTitle>
      <DialogDescription className="text-base">
        Revise as informações antes de finalizar o cadastro do negócio
      </DialogDescription>
    </DialogHeader>

    {/* CONTEÚDO rola; ocupa o espaço entre header e footer */}
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border-2 border-border/40 bg-muted/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">{section.title}</h3>
              </div>

              <div className="space-y-2 ml-7">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between gap-4">
                    <span className="text-sm text-muted-foreground min-w-[120px]">
                      {item.label}:
                    </span>
                    <span className="text-sm font-medium text-right flex-1">
                      {item.value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Footer SEM sticky: fica sempre no final do DialogContent */}
    <DialogFooter className="p-6 border-t gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowConfirm(false)}
        className="h-11"
      >
        Voltar e Editar
      </Button>
      <Button
        type="button"
        onClick={confirmAndSubmit}
        className="h-11 bg-primary hover:bg-primary/90"
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Confirmar Cadastro
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      {showSuccess && (
        <SuccessMessage
          businessName={submittedBusinessName}
          onClose={handleCloseSuccess}
        />
      )}
    </>
  );
}
