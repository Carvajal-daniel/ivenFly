"use client";
import { useState } from "react";
import { RegisterFormState, FormErrors } from "./RegisterForm.types";
import { validateCpf, validatePhone, validateEmail } from "@/lib/validations/validateForm";
import { createUser } from "@/lib/api/users";

export function useRegisterForm(onSuccess: () => void) {
  const [form, setForm] = useState<RegisterFormState>({
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

  const handleChange = (field: keyof RegisterFormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

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
    else if (form.password.length < 8)
      errs.password = "Senha deve ter no mínimo 8 caracteres";
    if (!form.confirmPassword)
      errs.confirmPassword = "Confirmação de senha é obrigatória";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Senhas não coincidem";
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
  const msg = (data?.error || data?.message || "").toLowerCase();

  if (msg === "invalid_cpf") setErrors({ cpf: "CPF inválido" });
  else if (msg.includes("cpf")) setErrors({ cpf: "CPF já cadastrado" });
  else if (msg.includes("email")) setErrors({ email: "Email já cadastrado" });
  else if (msg.includes("phone")) setErrors({ phone: "Telefone já cadastrado" });
  else setErrors({ general: "Erro ao criar usuário" });
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
        onSuccess();
      }, 2000);
    } catch {
      setErrors({ general: "Erro de conexão" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    errors,
    isLoading,
    isSuccess,
    handleChange,
    clearError,
    handleSubmit,
  };
}
