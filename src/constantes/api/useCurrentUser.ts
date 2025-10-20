// src/hooks/useCurrentUser.ts (Código Corrigido e Otimizado)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
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

  useEffect(() => {
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
        console.error("Variável NEXT_PUBLIC_API_URL não definida.");
        setLoading(false);
        return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/dashboard`, {
          credentials: "include",
          cache: 'no-store', 
        });

        if (res.status === 401 || res.status === 403) {
         
          setUser(null);
       
          return;
        }

        if (!res.ok) {
            // Tratar outros erros de rede/servidor (500, etc.)
            toast.error("Falha ao carregar dados do usuário.");
            setUser(null);
            return;
        }

        const data = await res.json();
        setUser(data.user || null);
      } catch (e) {
        console.error("Erro na requisição de usuário:", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // A chamada ocorre APÓS a montagem inicial do componente, garantindo que seja Client-Side.
    fetchUser();
    
  }, [router]); // Adicionamos 'router' às dependências por boa prática do Next.js

  return { user, loading, isAuthenticated: !!user };
}