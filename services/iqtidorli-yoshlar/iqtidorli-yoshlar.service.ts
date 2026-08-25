import api from "@/config/axios/axios";
import type { IqtidorliYoshlar, PaginationParams } from "@/types/api";

export const iqtidorliYoshlarService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/iqtidorliYoshlar", { params });
    return data;
  },

  getById: async (id: string): Promise<IqtidorliYoshlar> => {
    const { data } = await api.get(`/public/iqtidorliYoshlar/${id}`);
    return data;
  },
};
