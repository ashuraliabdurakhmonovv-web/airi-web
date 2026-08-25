import api from "@/config/axios/axios";

export const healthService = {
  check: async () => {
    const { data } = await api.get("/health");
    return data;
  },
};
