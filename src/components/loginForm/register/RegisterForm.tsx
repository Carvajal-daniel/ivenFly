"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "./CheckboxField";
import { PasswordInput } from "./PasswordInput";
import { TextInput } from "./TextInput";
import { SuccessMessage } from "./SuccessMessage";
import { useRegisterForm } from "./RegisterForm.hooks";
import { RegisterFormProps } from "./RegisterForm.types";
import { formatCpf, formatPhone } from "@/lib/format";

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const {
    form,
    errors,
    isLoading,
    isSuccess,
    handleChange,
    clearError,
    handleSubmit,
  } = useRegisterForm(onSwitchToLogin);

  if (isSuccess) return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
          {errors.general}
        </div>
      )}

      <TextInput
        id="name"
        name="name"
        placeholder="Digite seu nome completo"
        value={form.name}
        onChange={(v) => {
          handleChange("name", v);
          clearError("name");
        }}
        error={errors.name}
        disabled={isLoading}
      />

      <TextInput
        id="email"
        name="email"
        placeholder="seu@email.com"
        value={form.email}
        onChange={(v) => {
          handleChange("email", v);
          clearError("email");
        }}
        error={errors.email}
        disabled={isLoading}
        type="email"
      />

      <TextInput
        id="cpf"
        name="cpf"
        placeholder="000.000.000-00"
        value={form.cpf}
        onChange={(v) => {
          handleChange("cpf", formatCpf(v));
          clearError("cpf");
        }}
        error={errors.cpf}
        disabled={isLoading}
        maxLength={14}
      />

      <TextInput
        id="phone"
        name="phone"
        placeholder="(11) 99999-9999"
        value={form.phone}
        onChange={(v) => {
          handleChange("phone", formatPhone(v));
          clearError("phone");
        }}
        error={errors.phone}
        disabled={isLoading}
        maxLength={15}
      />

      <PasswordInput
        id="password"
        name="password"
        placeholder="Mínimo 8 caracteres"
        value={form.password}
        onChange={(v) => {
          handleChange("password", v);
          clearError("password");
        }}
        error={errors.password}
        disabled={isLoading}
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirme sua senha"
        value={form.confirmPassword}
        onChange={(v) => {
          handleChange("confirmPassword", v);
          clearError("confirmPassword");
        }}
        error={errors.confirmPassword}
        disabled={isLoading}
      />

      <CheckboxField
        id="terms"
        checked={form.termsAccepted}
        onChange={(v) => {
          handleChange("termsAccepted", v);
          clearError("terms");
        }}
        label={
          <span>
            Aceito os{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => window.open("/terms", "_blank")}
            >
              Termos
            </button>{" "}
            e a{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => window.open("/privacy", "_blank")}
            >
              Política de Privacidade
            </button>
          </span>
        }
        error={errors.terms}
        disabled={isLoading}
      />

      <Button type="submit" className="w-full h-12" disabled={isLoading}>
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>

      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:underline font-medium"
          disabled={isLoading}
        >
          Fazer login
        </button>
      </div>
    </form>
  );
};
