// src/hooks/useLoginForm.hooks.ts (CÓDIGO AJUSTADO)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormValues, FieldError } from "./LoginForm.types";
import { loginUser } from "@/lib/api/users";
// Importar toast se não estiver importado para as mensagens de erro
// import { toast } from 'sonner'; 

export function useLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValues((prev) => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  // ***************************************************************
  // *** PONTO DE CORREÇÃO: Usar o Proxy no useEffect de checagem ***
  // ***************************************************************
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // USE O ENDPOINT DO PROXY QUE ESTÁ FUNCIONANDO
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, { 
          method: "GET",
          credentials: "include",
          cache: 'no-store', 
        });
        
       
        if (res.ok) {
           router.replace("/dashboard"); 
        }
        
        // Se res.status for 401/403, o código segue normalmente e o formulário é exibido.

      } catch (e) {
        // Se for erro de rede/CORS, exibe o formulário (ou lida com o erro,
        // mas não faz redirecionamento de /auth para /auth)
        console.error("Erro na verificação inicial de autenticação:", e);
      }
    };
    checkAuth();
  }, [router]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!values.email.trim()) return setErrors({ email: "Email é obrigatório" });
    if (!values.password) return setErrors({ password: "Senha é obrigatória" });

    setLoading(true);
    try {
      const { ok, data } = await loginUser(values);
      
      if (!ok) {
        const msg = data.message || "Credenciais inválidas";
        if (msg.toLowerCase().includes("email"))
          setErrors({ email: msg });
        else
          setErrors({ password: msg });
        return;
      }

      if (values.rememberMe) localStorage.setItem("rememberEmail", values.email);
      else localStorage.removeItem("rememberEmail");

      // *********************************************************
      // *** Ajuste final: Usar replace e refresh ***
      // *********************************************************
      
      // O router.replace deve ser suficiente, mas refresh garante que o
      // middleware seja reavaliado.
      router.replace("/dashboard"); 
      router.refresh(); 

    } catch {
      setErrors({ email: "Erro ao fazer login" });
    } finally {
      setLoading(false);
    }
  }

  return {
    values,
    setValues,
    errors,
    loading,
    handleSubmit,
  };
}