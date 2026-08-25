import api from "@/config/axios/axios";
import type { ICPublication, ICPublicationFilterParams } from "@/types/api";

export const icPublicationsService = {
  getAll: async (params?: ICPublicationFilterParams) => {
    const { data } = await api.get("/public/ic-publications", { params });
    return data;
  },

  getById: async (id: string): Promise<ICPublication> => {
    const { data } = await api.get(`/public/ic-publications/${id}`);
    return data;
  },
};
