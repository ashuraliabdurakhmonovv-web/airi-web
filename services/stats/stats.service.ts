import api from "@/config/axios/axios";
import type { Stat, PaginationParams } from "@/types/api";

export const statsService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/stats", { params });
    return data;
  },

  getById: async (id: string): Promise<Stat> => {
    const { data } = await api.get(`/public/stats/${id}`);
    return data;
  },
};
