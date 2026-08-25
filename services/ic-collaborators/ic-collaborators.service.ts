import api from "@/config/axios/axios";
import type { ICCollaborator, ICCollaboratorFilterParams } from "@/types/api";

export const icCollaboratorsService = {
  getAll: async (params?: ICCollaboratorFilterParams) => {
    const { data } = await api.get("/public/ic-collaborators", { params });
    return data;
  },

  getById: async (id: string): Promise<ICCollaborator> => {
    const { data } = await api.get(`/public/ic-collaborators/${id}`);
    return data;
  },
};
