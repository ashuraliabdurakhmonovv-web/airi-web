import api from "@/config/axios/axios";
import type { Graduate, PaginationParams } from "@/types/api";

export const graduatesService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/graduates", { params });
    return data;
  },

  getById: async (id: string): Promise<Graduate> => {
    const { data } = await api.get(`/public/graduates/${id}`);
    return data;
  },
};
