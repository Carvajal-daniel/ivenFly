"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
}

interface ApiResponse {
  error?: string;
  message?: string;
  [key: string]: unknown; // qualquer outro campo da API
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Formatação ---
  const formatCpf = (value: string) => {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      cleaned = cleaned.replace(/(\d{3})(\d)/, "$1.$2");
      cleaned = cleaned.replace(/(\d{3})(\d)/, "$1.$2");
      cleaned = cleaned.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cleaned;
  };

  const formatPhone = (value: string) => {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      cleaned = cleaned.replace(/^(\d{2})(\d)/, "($1) $2");
      cleaned = cleaned.replace(/(\d{4,5})(\d)/, "$1-$2");
    }
    return cleaned;
  };

  // --- Validações ---
  const validateCpf = (cpf: string) => cpf.replace(/\D/g, "").length === 11;
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 11;
  };
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!validateEmail(email)) newErrors.email = "Email inválido";

    if (!cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    else if (!validateCpf(cpf)) newErrors.cpf = "CPF inválido";

    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório";
    else if (!validatePhone(phone)) newErrors.phone = "Telefone inválido";

    if (!password) newErrors.password = "Senha é obrigatória";
    else if (password.length < 8)
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";

    if (!confirmPassword) newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Senhas não coincidem";

    if (!termsAccepted) newErrors.terms = "Você deve aceitar os termos";

    return newErrors;
  };

  // --- Envio do formulário ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setIsSuccess(false);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    cpf: cpf.replace(/\D/g, ""),
    phone: phone.replace(/\D/g, ""),
    password,
  }),
});


      let data: ApiResponse = {};
      try {
        data = (await response.json()) as ApiResponse;
      } catch {}

      if (!response.ok) {
        const msg = (data?.error || data?.message || "Erro desconhecido") as string;

        if (msg.toLowerCase().includes("email") && (msg.toLowerCase().includes("já") || msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate"))) {
          setErrors({ email: "Email já cadastrado" });
        } else if (msg.toLowerCase().includes("cpf") && (msg.toLowerCase().includes("já") || msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate"))) {
          setErrors({ cpf: "CPF já cadastrado" });
        } else if (msg.toLowerCase().includes("phone") && (msg.toLowerCase().includes("já") || msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate"))) {
          setErrors({ phone: "Telefone já cadastrado" });
        } else if (msg.toLowerCase().includes("password") && msg.toLowerCase().includes("required")) {
          setErrors({ password: "Senha é obrigatória" });
        } else if (msg.toLowerCase().includes("validation") || msg.toLowerCase().includes("invalid")) {
          if (msg.toLowerCase().includes("email")) setErrors({ email: "Email inválido" });
          else if (msg.toLowerCase().includes("cpf")) setErrors({ cpf: "CPF inválido" });
          else if (msg.toLowerCase().includes("phone")) setErrors({ phone: "Telefone inválido" });
          else setErrors({ general: `Erro de validação: ${msg}` });
        } else if (msg.toLowerCase().includes("required") || msg.toLowerCase().includes("not null")) {
          setErrors({ general: "Todos os campos obrigatórios devem ser preenchidos" });
        } else {
          setErrors({ general: `Erro ao criar usuário: ${msg}` });
        }
        return;
      }

      setIsSuccess(true);

      setTimeout(() => {
        setName("");
        setEmail("");
        setCpf("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setTermsAccepted(false);
        setIsSuccess(false);
        onSwitchToLogin();
      }, 2000);

    } catch (err: unknown) {
      if (err instanceof Error) setErrors({ general: `Erro de conexão: ${err.message}` });
      else setErrors({ general: `Erro de conexão: ${String(err)}` });
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX ---
  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-800">Conta criada com sucesso!</h3>
          <p className="text-sm text-green-600 mt-1">Redirecionando para o login...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Erro geral */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{errors.general}</p>
        </div>
      )}

      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Nome completo *</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Digite seu nome completo"
          required
          value={name}
          onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
          className={`h-11 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
          className={`h-11 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* CPF */}
      <div className="space-y-2">
        <Label htmlFor="cpf" className="text-sm font-medium">CPF *</Label>
        <Input
          id="cpf"
          name="cpf"
          type="text"
          placeholder="000.000.000-00"
          required
          value={cpf}
          maxLength={14}
          onChange={(e) => { setCpf(formatCpf(e.target.value)); clearFieldError("cpf"); }}
          className={`h-11 ${errors.cpf ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.cpf && <p className="text-sm text-red-600">{errors.cpf}</p>}
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">Telefone *</Label>
        <Input
          id="phone"
          name="phone"
          type="text"
          placeholder="(11) 99999-9999"
          required
          value={phone}
          maxLength={15}
          onChange={(e) => { setPhone(formatPhone(e.target.value)); clearFieldError("phone"); }}
          className={`h-11 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Senha */}
      <div className="space-y-2 relative">
        <Label htmlFor="password" className="text-sm font-medium">Senha *</Label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Mínimo 8 caracteres"
          required
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
          className={`h-11 pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(s => !s)}
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* Confirmar Senha */}
      <div className="space-y-2 relative">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar senha *</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirme sua senha"
          required
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }}
          className={`h-11 pr-10 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(s => !s)}
          aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
          className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      {/* Termos */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={checked => { setTermsAccepted(checked as boolean); clearFieldError("terms"); }}
            disabled={isLoading}
            className={errors.terms ? "border-red-500 mt-0.5" : "mt-0.5"}
          />
          <Label htmlFor="terms" className="text-sm font-normal leading-5 cursor-pointer flex-1">
            Aceito os{" "}
            <button type="button" className="text-primary hover:underline" onClick={() => window.open("/terms", "_blank")}>Termos de Serviço</button>{" "}
            e a{" "}
            <button type="button" className="text-primary hover:underline" onClick={() => window.open("/privacy", "_blank")}>Política de Privacidade</button>
          </Label>
        </div>
        {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}
      </div>

      <Button type="submit" className="w-full h-12" disabled={isLoading}>
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>

      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-medium" disabled={isLoading}>
            Fazer login
          </button>
        </span>
      </div>
    </form>
  );
};
