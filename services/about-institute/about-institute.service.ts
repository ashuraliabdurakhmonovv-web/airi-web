import api from "@/config/axios/axios";
import type { AboutInstitute } from "@/types/api";

export const aboutInstituteService = {
  getAll: async (): Promise<AboutInstitute[]> => {
    const { data } = await api.get("/public/aboutInst");
    return data;
  },
};
