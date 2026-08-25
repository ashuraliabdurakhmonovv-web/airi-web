import api from "@/config/axios/axios";
import type { Research, PaginationParams } from "@/types/api";

export const researchService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/research", { params });
    return data;
  },

  getById: async (id: string): Promise<Research> => {
    const { data } = await api.get(`/public/research/${id}`);
    return data;
  },
};
