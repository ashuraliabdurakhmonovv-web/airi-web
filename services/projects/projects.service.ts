import api from "@/config/axios/axios";
import type { Project, PaginationParams } from "@/types/api";

export const projectsService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/projects", { params });
    return data;
  },

  getById: async (id: string): Promise<Project> => {
    const { data } = await api.get(`/public/projects/${id}`);
    return data;
  },
};
