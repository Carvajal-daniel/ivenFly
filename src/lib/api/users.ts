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
    console.error("Falha ao parsear JSON na criação de usuário:", error);
  }

  return { ok: response.ok, data };
};

export async function loginUser(values: { email: string; password: string }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // importante
      body: JSON.stringify(values),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("Erro no login:", error);
    return { ok: false, data: { message: "Erro de conexão com o servidor" } };
  }
}
