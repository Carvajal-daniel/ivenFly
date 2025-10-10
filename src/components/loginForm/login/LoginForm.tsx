"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock } from "lucide-react";
import { useLoginForm } from "./LoginForm.hooks";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { RememberMe } from "./RememberMe";
import { SocialLogin } from "./SocialLogin";
import { LoginFormProps } from "./LoginForm.types";

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { values, setValues, errors, loading, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <InputField
        id="email"
        value={values.email}
        onChange={(v) => setValues({ ...values, email: v })}
        placeholder="seu@email.com"
        icon={<Mail size={18} />}
        error={errors.email || null}
        disabled={loading}
        autoComplete="email"
      />

      <PasswordField
        id="password"
        value={values.password}
        onChange={(v) => setValues({ ...values, password: v })}
        error={errors.password || null}
        placeholder="••••••••"
        icon={<Lock size={18} />}
        disabled={loading}
      />

      <div className="flex items-center justify-between">
        <RememberMe
          checked={values.rememberMe}
          onChange={(v) => setValues({ ...values, rememberMe: v })}
          disabled={loading}
        />
        <button
          type="button"
          className="text-sm text-primary hover:underline font-medium"
          disabled={loading}
        >
          Esqueci minha senha
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            ou continue com
          </span>
        </div>
      </div>

      <SocialLogin />

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Não tem uma conta? </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary hover:underline font-medium"
          disabled={loading}
        >
          Cadastre-se
        </button>
      </div>
    </form>
  );
}
