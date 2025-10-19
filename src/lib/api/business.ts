
import type { BusinessData } from "@/components/admin/business/business-registration/BusinessInterfaces";
import type { ApiResponse } from "@/types/api.types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const createBusiness = async (businessData: BusinessData) => {
    if (!api) {
        console.error("NEXT_PUBLIC_API_URL não está definida.");
        return { ok: false, data: { message: "URL da API não configurada." } as ApiResponse };
    }

    const hoursPayload = businessData.hours.length > 0 
                         ? JSON.stringify(businessData.hours) 
                         : "[]";

    // PAYLOAD COMPLETO 
    const payload = {
        name: businessData.name.trim(),
        niche: businessData.niche,
        
        location: businessData.address.localidade || "Localidade Desconhecida", 
        hours: hoursPayload, 

        // Campos Financeiros e de Preço
        revenue: businessData.revenue ?? 0, 
        expenses: businessData.expenses ?? 0,
        minServicePrice: businessData.minServicePrice ?? 0,
        maxServicePrice: businessData.maxServicePrice ?? 0,
        avgServicePrice: businessData.avgServicePrice ?? 0,

        // Campos de Serviço e Equipe
        services: businessData.services,
        employees: businessData.employees ?? 0,
        
        // Campos de Marketing e Desafios
        usesSocialMedia: businessData.usesSocialMedia,
        socialPlatforms: businessData.socialPlatforms,
        challenges: businessData.challenges,
        reportFrequency: businessData.reportFrequency,
    };

   
    const cleanPayload = payload as Record<string, unknown>;

    // Limpeza de campos numéricos
    if (payload.revenue === 0) delete cleanPayload.revenue;
    if (payload.expenses === 0) delete cleanPayload.expenses;
    if (payload.minServicePrice === 0) delete cleanPayload.minServicePrice;
    if (payload.maxServicePrice === 0) delete cleanPayload.maxServicePrice;
    if (payload.avgServicePrice === 0) delete cleanPayload.avgServicePrice;
    if (payload.employees === 0) delete cleanPayload.employees;

    try {
        const response = await fetch(`${api}/api/business`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cleanPayload), // Usa o payload limpo
            credentials: 'include'
        });

        let data: ApiResponse = {};
        
        // Lemos o corpo da resposta como texto Apenas Uma Vez
        const text = await response.text();
        
        if (text) {
            try {
                data = JSON.parse(text); 
            } catch (e) {
                console.error("Erro ao parsear JSON da resposta:", e);
                data = { message: `Erro interno do servidor (${response.status}). Verifique os logs do backend.`, error: text } as ApiResponse;
            }
        }
        
        return { ok: response.ok, data };

    } catch (error) {
        console.error("Erro na requisição de criação de negócio:", error);
        return { ok: false, data: { message: "Erro de rede ou na requisição." } as ApiResponse };
    }
};