"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const redirectToLogin = useCallback(() => {
    const PUBLIC_ROUTES = ['/', '/auth', '/cadastro', '/recuperar-senha'];

    if (!PUBLIC_ROUTES.includes(pathname)) {
      sessionStorage.setItem('redirectTo', pathname);
      router.replace('/auth');
      toast.info("Sua sessão expirou ou você precisa fazer login.");
    }
  }, [router, pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401) {
          // Sessão expirada ou token inválido
          setUser(null);
          redirectToLogin();
          return;
        }

        if (res.status === 403) {
          // Conta inativa
          setUser(null);
          toast.error("Conta inativa. Ative sua conta para acessar.");
          router.replace("/"); 
          return;
        }

        if (!res.ok) {
          setUser(null);
          toast.error("Falha ao carregar dados do usuário.");
          return;
        }

        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          redirectToLogin();
        }
      } catch (error) {
        console.error("Erro na requisição de usuário:", error);
        toast.error("Problema de conexão com o servidor. 😥");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [redirectToLogin, router, pathname]);

  return { user, loading, isAuthenticated: !!user };
}
