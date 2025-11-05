import * as z from "zod";
import { NICHES_TUPLE } from "./constants";

// enum com a tupla correta (readonly)
const NichesEnum = z.enum(NICHES_TUPLE);


// aceita um nicho da lista OU um custom (string ≥ 2 chars)
const nicheSchema = z.union([
  NichesEnum,
  z.string().trim().min(2, "Informe um nicho válido"),
]);

export const formSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    niche: nicheSchema, // aceita custom também
    description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),

    // ✅ backend aceita somente essas 3 opções
    operatingYears: z.enum(["menos de 1 ano", "1-3 anos", "+3 anos"], {
      required_error: "O tempo de operação é obrigatório",
      invalid_type_error: "Selecione um tempo válido",
    }),

    location: z.object({
      cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
      street: z.string().min(1, "Rua é obrigatória"),
      number: z.string().min(1, "Número é obrigatório"),
      city: z.string().min(1, "Cidade é obrigatória"),
      state: z.string().length(2, "Estado deve ter 2 caracteres"),
      country: z.string().min(1, "País é obrigatório").default("Brasil"),
    }),

    amenities: z.object({
      airConditioning: z.boolean().default(false),
      coffee: z.boolean().default(false),
      water: z.boolean().default(false),
      wifi: z.boolean().default(false),
      parking: z.boolean().default(false),
      otherAmenities: z.string().optional(),
    }),

    services: z.array(z.string()).min(1, "Selecione pelo menos um serviço"),
    employees: z.coerce.number().min(1, "Mínimo 1 funcionário"),
    revenue: z.coerce.number().min(0, "Receita não pode ser negativa").optional(),
    expenses: z.coerce.number().min(0, "Despesas não podem ser negativas").optional(),
    minServicePrice: z.coerce.number().min(0.01, "Preço mínimo é obrigatório"),
    maxServicePrice: z.coerce.number().min(0.01, "Preço máximo é obrigatório"),
    usesSocialMedia: z.boolean().default(false),
    socialPlatforms: z.array(z.string()).optional(),
    challenges: z.string().min(10, "Desafios devem ter pelo menos 10 caracteres"),
    reportFrequency: z.enum(["diária", "semanal", "mensal"], {
      required_error: "A frequência é obrigatória",
    }),
    capacity: z.coerce.number().min(1, "Capacidade mínima é 1"),
    delivery: z.boolean().default(false),
    businessHours: z
      .array(
        z.object({
          day: z.string(),
          open: z.string(),
          close: z.string(),
        })
      )
      .min(7, "O horário de funcionamento deve cobrir os 7 dias da semana."),
    postingFrequency: z
      .string()
      .min(1, "A frequência de postagem é obrigatória se usar redes sociais")
      .optional(),
  })
  .refine((data) => data.maxServicePrice >= data.minServicePrice, {
    message: "Preço máximo deve ser maior ou igual ao mínimo",
    path: ["maxServicePrice"],
  })
  .refine(
    (data) => !data.usesSocialMedia || (data.socialPlatforms && data.socialPlatforms.length > 0),
    {
      message: "Selecione as plataformas sociais que utiliza.",
      path: ["socialPlatforms"],
    }
  )
  .refine((data) => !data.usesSocialMedia || data.postingFrequency, {
    message: "A frequência de postagem é obrigatória.",
    path: ["postingFrequency"],
  });

export type FormValues = z.infer<typeof formSchema>;
