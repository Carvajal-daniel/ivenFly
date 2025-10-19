// src/components/business-registration/BusinessInterfaces.ts

export interface Address {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string; 
}

export interface WorkingHours {
  day: string;
  start: string;
  end: string;
}

export interface BusinessData {
  name: string;
  niche: string;
  address: Address;
  revenue?: number;
  expenses?: number;
  minServicePrice?: number;
  maxServicePrice?: number;
  avgServicePrice?: number;
  services: string[];
  employees: number | undefined; 
  hours: WorkingHours[];
  usesSocialMedia: boolean;
  socialPlatforms: string[];
  challenges: string;
  reportFrequency: string;
}

export const TOTAL_STEPS = 12;

export const INITIAL_FORM_DATA: BusinessData = {
  name: "",
  niche: "",
  address: {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    numero: "",
  },
  revenue: undefined,
  expenses: undefined,
  minServicePrice: undefined,
  maxServicePrice: undefined,
  avgServicePrice: undefined,
  services: [],
  employees: undefined, 
  hours: [],
  usesSocialMedia: false,
  socialPlatforms: [],
  challenges: "",
  reportFrequency: "",
};