import api from "@/config/axios/axios";
import type { News, NewsQueryParams, PaginatedResponse } from "@/types/api";

type ApiEnvelope<T> = { data: T };
export type NewsListResponse = PaginatedResponse<News>;

export const newsService = {
  getAll: async (params?: NewsQueryParams): Promise<NewsListResponse> => {
    const { data } = await api.get("/public/news", { params });
    return {
      data: data.data || [],
      total: data.pagination?.total || 0,
      page: data.pagination?.page || params?.page || 1,
      limit: data.pagination?.limit || params?.limit || 20,
      totalPages: data.pagination?.totalPages || 0,
    };
  },

  getById: async (identifier: string): Promise<News> => {
    const { data } = await api.get<ApiEnvelope<News>>(`/public/news/${encodeURIComponent(identifier)}`);
    return data.data;
  },

  getRelated: async (identifier: string, limit = 3): Promise<News[]> => {
    const { data } = await api.get<ApiEnvelope<News[]>>(
      `/public/news/${encodeURIComponent(identifier)}/related`,
      { params: { limit } },
    );
    return data.data || [];
  },
};
