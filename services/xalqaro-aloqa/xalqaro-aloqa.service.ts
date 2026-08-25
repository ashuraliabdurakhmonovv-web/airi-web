import api from "@/config/axios/axios";
import type { XalqaroAloqa } from "@/types/api";

export const xalqaroAloqaService = {
  getAll: async (): Promise<XalqaroAloqa[]> => {
    const { data } = await api.get("/public/xalqaroAloqa");
    return data;
  },

  getById: async (id: string): Promise<XalqaroAloqa> => {
    const { data } = await api.get(`/public/xalqaroAloqa/${id}`);
    return data;
  },
};
