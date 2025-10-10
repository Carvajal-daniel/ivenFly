import { ApiResponse } from "@/types/api.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createUser = async (user: {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  let data: ApiResponse = {};
  try {
    data = await response.json();
  } catch {}

  return { ok: response.ok, data };
};

export const loginUser = async (user: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const data: ApiResponse = await response.json();
  return { ok: response.ok, data };
};
