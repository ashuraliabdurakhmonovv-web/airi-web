import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { icNewsService } from "@/services/ic-news/ic-news.service";
import type { ICNewsFilterParams } from "@/types/api";

export const useICNews = (params?: ICNewsFilterParams) => {
  return useQuery({
    queryKey: queryKeys.icNews.list(params),
    queryFn: () => icNewsService.getAll(params),
  });
};

export const useICNewsById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.icNews.detail(id),
    queryFn: () => icNewsService.getById(id),
    enabled: !!id,
  });
};
