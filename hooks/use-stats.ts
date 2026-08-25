import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { statsService } from "@/services/stats/stats.service";
import type { PaginationParams } from "@/types/api";


export const useStats = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.stats.list(params),
    queryFn: () => statsService.getAll(params),
  });
};

export const useStatById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.stats.detail(id),
    queryFn: () => statsService.getById(id),
    enabled: !!id,
  });
};
