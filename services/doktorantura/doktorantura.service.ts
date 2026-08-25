import api from "@/config/axios/axios";
import type { Doktorantura, PaginationParams } from "@/types/api";

export const doktoranturaService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/doktorantura", { params });
    return data;
  },

  getById: async (id: string): Promise<Doktorantura> => {
    const { data } = await api.get(`/public/doktorantura/${id}`);
    return data;
  },
};
