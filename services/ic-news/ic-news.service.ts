import api from "@/config/axios/axios";
import type { ICNews, ICNewsFilterParams } from "@/types/api";

export const icNewsService = {
  getAll: async (params?: ICNewsFilterParams) => {
    const { data } = await api.get("/public/ic-news", { params });
    return data;
  },

  getById: async (id: string): Promise<ICNews> => {
    const { data } = await api.get(`/public/ic-news/${id}`);
    return data;
  },
};
