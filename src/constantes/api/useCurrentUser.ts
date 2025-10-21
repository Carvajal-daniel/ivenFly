"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

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

  const PUBLIC_ROUTES = ['/', '/auth', '/cadastro', '/recuperar-senha'];

  const redirectToLogin = useCallback(() => {
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

        if (res.status === 401 || res.status === 403) {
          setUser(null);
          redirectToLogin();
          return;
        }

        if (!res.ok) {
          setUser(null);
          toast.error("Falha ao carregar dados do usuário.");
          return;
        }

        const data = await res.json();
        if (data.user) setUser(data.user);
        else {
          setUser(null);
          redirectToLogin();
        }
      } catch (e) {
        console.error("Erro na requisição de usuário:", e);
        toast.error("Problema de conexão com o servidor. 😥");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [redirectToLogin]);

  return { user, loading, isAuthenticated: !!user };
}
