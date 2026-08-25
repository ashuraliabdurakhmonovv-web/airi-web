import api from "@/config/axios/axios";
import type { Teacher, PaginationParams } from "@/types/api";

export const teachersService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/teachers", { params });
    return data;
  },

  getById: async (id: string): Promise<Teacher> => {
    const { data } = await api.get(`/public/teachers/${id}`);
    return data;
  },
};
