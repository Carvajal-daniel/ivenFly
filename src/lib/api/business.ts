import type { FormValues } from "@/components/admin/business/form-schema";
import type { ApiResponse } from "@/types/api.types";

export const createBusiness = async (data: FormValues): Promise<ApiResponse> => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return { ok: false, error: "API URL não configurada." };

  try {
    const response = await fetch(`${api}/api/business`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // envia cookies automaticamente
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Erro na criação do negócio:", result);
      return { ok: false, error: result?.message || "Erro ao criar o negócio." };
    }

    return { ok: true, data: result };
  } catch (error) {
    console.error("❌ Erro ao conectar com a API:", error);
    return { ok: false, error: "Falha na comunicação com o servidor." };
  }
};
