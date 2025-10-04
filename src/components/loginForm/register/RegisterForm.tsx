"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { CheckboxField } from "./CheckboxField";
import { SuccessMessage } from "./SuccessMessage";
import { formatCpf, formatPhone } from "@/lib/format";
import { validateCpf, validatePhone, validateEmail } from "@/lib/validation";
import { createUser } from "@/lib/api";

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

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearError = (field: keyof FormErrors) => setErrors(prev => ({ ...prev, [field]: undefined }));
  const handleChange = (field: keyof typeof form, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  const validateForm = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Nome é obrigatório";
    if (!form.email.trim()) errs.email = "Email é obrigatório";
    else if (!validateEmail(form.email)) errs.email = "Email inválido";
    if (!form.cpf.trim()) errs.cpf = "CPF é obrigatório";
    else if (!validateCpf(form.cpf)) errs.cpf = "CPF inválido";
    if (!form.phone.trim()) errs.phone = "Telefone é obrigatório";
    else if (!validatePhone(form.phone)) errs.phone = "Telefone inválido";
    if (!form.password) errs.password = "Senha é obrigatória";
    else if (form.password.length < 8) errs.password = "Senha deve ter no mínimo 8 caracteres";
    if (!form.confirmPassword) errs.confirmPassword = "Confirmação de senha é obrigatória";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Senhas não coincidem";
    if (!form.termsAccepted) errs.terms = "Você deve aceitar os termos";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    setIsSuccess(false);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        cpf: form.cpf.replace(/\D/g, ""),
        phone: form.phone.replace(/\D/g, ""),
        password: form.password,
      };
      const { ok, data } = await createUser(payload);

      if (!ok) {
        const msg = (data?.error || data?.message || "").toString().toLowerCase();
        if (msg.includes("email")) setErrors({ email: "Email já cadastrado" });
        else if (msg.includes("cpf")) setErrors({ cpf: "CPF já cadastrado" });
        else if (msg.includes("phone")) setErrors({ phone: "Telefone já cadastrado" });
        else setErrors({ general: "Erro ao criar usuário" });
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          cpf: "",
          phone: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });
        setIsSuccess(false);
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setErrors({ general: "Erro de conexão" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">{errors.general}</div>}

      <TextInput id="name" name="name" placeholder="Digite seu nome completo" value={form.name} onChange={(v) => { handleChange("name", v); clearError("name"); }} error={errors.name} disabled={isLoading} />
      <TextInput id="email" name="email" placeholder="seu@email.com" value={form.email} onChange={(v) => { handleChange("email", v); clearError("email"); }} error={errors.email} disabled={isLoading} type="email" />
      <TextInput id="cpf" name="cpf" placeholder="000.000.000-00" value={form.cpf} onChange={(v) => { handleChange("cpf", formatCpf(v)); clearError("cpf"); }} error={errors.cpf} disabled={isLoading} maxLength={14} />
      <TextInput id="phone" name="phone" placeholder="(11) 99999-9999" value={form.phone} onChange={(v) => { handleChange("phone", formatPhone(v)); clearError("phone"); }} error={errors.phone} disabled={isLoading} maxLength={15} />
      <PasswordInput id="password" name="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={(v) => { handleChange("password", v); clearError("password"); }} error={errors.password} disabled={isLoading} />
      <PasswordInput id="confirmPassword" name="confirmPassword" placeholder="Confirme sua senha" value={form.confirmPassword} onChange={(v) => { handleChange("confirmPassword", v); clearError("confirmPassword"); }} error={errors.confirmPassword} disabled={isLoading} />

      <CheckboxField id="terms" checked={form.termsAccepted} onChange={(v) => { handleChange("termsAccepted", v); clearError("terms"); }} label={<span>Aceito os <button type="button" className="text-primary hover:underline" onClick={() => window.open("/terms", "_blank")}>Termos</button> e a <button type="button" className="text-primary hover:underline" onClick={() => window.open("/privacy", "_blank")}>Política de Privacidade</button></span>} error={errors.terms} disabled={isLoading} />

      <Button type="submit" className="w-full h-12" disabled={isLoading}>{isLoading ? "Criando conta..." : "Criar conta"}</Button>

      <div className="text-center text-sm">
        Já tem uma conta? <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-medium" disabled={isLoading}>Fazer login</button>
      </div>
    </form>
  );
};
