import api from "@/config/axios/axios";
import type { IlmiyKengash, PaginationParams } from "@/types/api";

export const ilmiyKengashService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/ilmiyKengash", { params });
    return data;
  },

  getById: async (id: string): Promise<IlmiyKengash> => {
    const { data } = await api.get(`/public/ilmiyKengash/${id}`);
    return data;
  },
};
