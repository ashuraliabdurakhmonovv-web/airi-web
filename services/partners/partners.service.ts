import api from "@/config/axios/axios";
import type { Partner, PaginationParams } from "@/types/api";

export const partnersService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/partners", { params });
    return data;
  },

  getById: async (id: string): Promise<Partner> => {
    const { data } = await api.get(`/public/partners/${id}`);
    return data;
  },
};
