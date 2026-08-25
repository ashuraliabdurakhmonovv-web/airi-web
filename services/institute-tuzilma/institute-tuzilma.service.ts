import api from "@/config/axios/axios";
import type { InstituteTuzilma } from "@/types/api";

export const instituteTuzilmaService = {
  getAll: async (): Promise<InstituteTuzilma[]> => {
    const { data } = await api.get("/public/instituteTuzilma");
    return data;
  },

  getById: async (id: string): Promise<InstituteTuzilma> => {
    const { data } = await api.get(`/public/instituteTuzilma/${id}`);
    return data;
  },
};
