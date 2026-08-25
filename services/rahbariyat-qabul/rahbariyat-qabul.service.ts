import api from "@/config/axios/axios";
import type { RahbariyatQabul, PaginationParams } from "@/types/api";

export const rahbariyatQabulService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/rahbariyatQabul", { params });
    return data;
  },

  getById: async (id: string): Promise<RahbariyatQabul> => {
    const { data } = await api.get(`/public/rahbariyatQabul/${id}`);
    return data;
  },
};
