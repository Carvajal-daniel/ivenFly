// src/services/business.service.ts

import type { BusinessData } from "@/components/admin/business/business-registration/BusinessInterfaces";
import type { ApiResponse } from "@/types/api.types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const createBusiness = async (businessData: BusinessData) => {
    if (!api) {
        console.error("NEXT_PUBLIC_API_URL não está definida.");
        return { ok: false, data: { message: "URL da API não configurada." } as ApiResponse };
    }

    // Serializa o array de horários (WorkingHours[]) para uma string JSON
    const hoursPayload = businessData.hours.length > 0 
                         ? JSON.stringify(businessData.hours) 
                         : "[]";

    // ⭐️ PAYLOAD COMPLETO ⭐️
    const payload = {
        name: businessData.name.trim(),
        niche: businessData.niche,
        
        // Mapeamento necessário para o backend
        location: businessData.address.localidade || "Localidade Desconhecida", 
        
        // Horários serializados como string JSON
        hours: hoursPayload, 

        // ------------------ CAMPOS FINANCEIROS E DE SERVIÇO ------------------
        revenue: businessData.revenue ?? 0, 
        expenses: businessData.expenses ?? 0,
        minServicePrice: businessData.minServicePrice ?? 0,
        maxServicePrice: businessData.maxServicePrice ?? 0,
        avgServicePrice: businessData.avgServicePrice ?? 0,

        services: businessData.services,
        employees: businessData.employees ?? 0,
        
        // ------------------ CAMPOS DE MÍDIA E DESAFIOS ------------------
        usesSocialMedia: businessData.usesSocialMedia,
        socialPlatforms: businessData.socialPlatforms,
        challenges: businessData.challenges,
        reportFrequency: businessData.reportFrequency,
    };

    // ⭐️ LIMPEZA DE CAMPOS NUMÉRICOS ⭐️
    if (payload.revenue === 0) delete (payload as any).revenue;
    if (payload.expenses === 0) delete (payload as any).expenses;
    if (payload.minServicePrice === 0) delete (payload as any).minServicePrice;
    if (payload.maxServicePrice === 0) delete (payload as any).maxServicePrice;
    if (payload.avgServicePrice === 0) delete (payload as any).avgServicePrice;
    if (payload.employees === 0) delete (payload as any).employees;

    try {
        const response = await fetch(`${api}/api/business`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        });

       
        let data: ApiResponse = {};
        
        // 🛑 CORREÇÃO AQUI: Lemos o corpo da resposta APENAS UMA VEZ como texto
        const text = await response.text();
        
        if (text) {
            try {
                // E usamos o texto lido para o parse.
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