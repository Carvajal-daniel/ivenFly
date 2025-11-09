// src/lib/api/business.ts
import type { FormValues } from "@/components/dashboard/business/form-schema";
import type { ApiResponse } from "@/types/api.types";

export const createBusiness = async (data: FormValues): Promise<ApiResponse> => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return { ok: false, error: "API URL não configurada." };

  try {
    const response = await fetch(`${api}/api/business`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    let result: unknown;
    try {
      result = await response.json();
    } catch {
      result = { message: `Erro inesperado do servidor. Status: ${response.status}` };
    }

    if (!response.ok) {
      const message =
        typeof result === "object" && result && "message" in result
          ? (result as { message?: string }).message
          : undefined;

      return {
        ok: false,
        error: message ?? "Erro ao criar o negócio no servidor.",
      };
    }

    return { ok: true, data: result };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Falha na comunicação com o servidor.";

    return { ok: false, error: message };
  }
};
