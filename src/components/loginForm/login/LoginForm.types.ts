export interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface FieldError {
  email?: string | null;
  password?: string | null;
}
