// --- CONSTANTES ---

export const NICHES = [
  "Barbearia",
  "Salão de Beleza",
  "Loja de Roupas",
  "Loja de Eletrônicos",
  "Lanchonete",
  "Açaiteria",
] as const;

// helper p/ o z.enum exigir uma tupla não-vazia
type NonEmptyStringTuple<T extends readonly string[]> =
  T extends readonly [string, ...string[]] ? T : never;

// exporta a tupla no formato exato que o z.enum precisa
export const NICHES_TUPLE = NICHES as NonEmptyStringTuple<typeof NICHES>;

// tipo com os nichos pré-definidos
export type NichePreset = typeof NICHES[number];

export const FOOD_CLOTHING_NICHES = ["Lanchonete", "Açaiteria", "Loja de Roupas"] as const;



export const SERVICES_BY_NICHE: Record<string, string[]> = {
  Barbearia: [
    "Corte de cabelo", "Barba", "Sobrancelha", "Pigmentação", "Relaxamento", "Luzes", "Platinado",
  ],
  "Salão de Beleza": [
    "Corte de cabelo", "Coloração", "Manicure", "Pedicure", "Escova", "Hidratação", "Maquiagem", "Design de sobrancelhas", "Depilação",
  ],
  "Loja de Roupas": [
    "Roupas masculinas", "Roupas femininas", "Roupas infantis", "Acessórios", "Calçados", "Roupas plus size",
  ],
  "Loja de Eletrônicos": [
    "Smartphones", "Notebooks", "Tablets", "Acessórios", "Consertos", "Assistência técnica",
  ],
  Lanchonete: [
    "Lanches", "Porções", "Bebidas", "Sobremesas", "Salgados", "Pratos executivos",
  ],
  Açaiteria: [
    "Açaí", "Smoothies", "Sorvetes", "Vitaminas", "Sucos", "Bowls",
  ],
};

export const DAYS = [
  { value: "Monday", label: "Segunda-feira" },
  { value: "Tuesday", label: "Terça-feira" },
  { value: "Wednesday", label: "Quarta-feira" },
  { value: "Thursday", label: "Quinta-feira" },
  { value: "Friday", label: "Sexta-feira" },
  { value: "Saturday", label: "Sábado" },
  { value: "Sunday", label: "Domingo" },
] as const;
