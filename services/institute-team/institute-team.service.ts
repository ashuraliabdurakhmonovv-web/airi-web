import api from "@/config/axios/axios";
import type { InstituteTeamMember, PaginationParams } from "@/types/api";

export const instituteTeamService = {
  getAll: async (params?: PaginationParams) => {
    const { data } = await api.get("/public/instituteTeam", { params });
    return data;
  },

  getById: async (id: string): Promise<InstituteTeamMember> => {
    const { data } = await api.get(`/public/instituteTeam/${id}`);
    return data;
  },
};
