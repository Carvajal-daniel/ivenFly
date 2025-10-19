import { ApiResponse } from "@/types/api.types";



export const createUser = async (user: {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  let data: ApiResponse = {};
  try {
    data = await response.json();
  } catch (error) {
    // Se a API não retornar JSON, isso impede o crash
    console.error("Falha ao parsear JSON na criação de usuário:", error);
  }

  return { ok: response.ok, data };
};

export const loginUser = async (user: { email: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include", 
  });

  let data: ApiResponse = {};
  

  try {
    data = await response.json();
  } catch (error) {
    console.error("Falha ao parsear JSON no login:", error);
  }

  return { ok: response.ok, data };
};