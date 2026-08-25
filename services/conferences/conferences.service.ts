import api from "@/config/axios/axios";
import type { Conference, ConferenceFilterParams } from "@/types/api";

export const conferencesService = {
  getAll: async (params?: ConferenceFilterParams) => {
    const { data } = await api.get("/public/conferences", { params });
    return data;
  },

  getById: async (id: string): Promise<Conference> => {
    const { data } = await api.get(`/public/conferences/${id}`);
    return data;
  },

  getBySlug: async (slug: string): Promise<Conference> => {
    const { data } = await api.get(`/public/conferences/slug/${slug}`);
    return data;
  },
};
