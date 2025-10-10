export interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export interface FormErrors {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
}

export interface RegisterFormState {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}
