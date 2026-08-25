import api from "@/config/axios/axios";
import type { InstituteEvent, PaginationParams } from "@/types/api";

export const instituteEventsService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/instituteEvent", { params });
    return data;
  },

  getById: async (id: string): Promise<InstituteEvent> => {
    const { data } = await api.get(`/public/instituteEvent/${id}`);
    return data;
  },
};
