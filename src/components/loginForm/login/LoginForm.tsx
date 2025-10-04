"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { RememberMe } from "./RememberMe";
import { SocialLogin } from "./SocialLogin";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "@/lib/api";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail(null);
    setErrorPassword(null);

    if (!email.trim()) return setErrorEmail("Email é obrigatório");
    if (!password) return setErrorPassword("Senha é obrigatória");

    setIsLoading(true);
    try {
      const { ok, data } = await loginUser({ email, password });
      if (!ok) {
        const msg = data.message || "Credenciais inválidas";
        if (msg.toLowerCase().includes("email")) setErrorEmail(msg);
        else setErrorPassword(msg);
        return;
      }
      if (rememberMe) localStorage.setItem("rememberEmail", email);
      else localStorage.removeItem("rememberEmail");

      router.push("/dashboard");
    } catch (error) {
      setErrorEmail("Erro ao fazer login");
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="email"
        value={email}
        onChange={setEmail}
        placeholder="seu@email.com"
        icon={<Mail size={18} />}
        error={errorEmail}
        disabled={isLoading}
        autoComplete="email"
      />
      <PasswordField
        id="password"
        value={password}
        onChange={setPassword}
        error={errorPassword}
        placeholder="••••••••"
        icon={<Lock size={18}/>}
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <RememberMe
          checked={rememberMe}
          onChange={setRememberMe}
          disabled={isLoading}
        />
        <button
          type="button"
          className="text-sm text-primary hover:underline font-medium"
          disabled={isLoading}
        >
          Esqueci minha senha
        </button>
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
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
          disabled={isLoading}
        >
          Cadastre-se
        </button>
      </div>
    </form>
  );
};
