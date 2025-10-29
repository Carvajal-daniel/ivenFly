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


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, { 
          method: "GET",
          credentials: "include",
          cache: 'no-store', 
        });
        
       
        if (res.ok) {
           router.replace("/dashboard"); 
        }
    

      } catch (e) {
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