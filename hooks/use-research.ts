import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { researchService } from "@/services/research/research.service";
import type { PaginationParams } from "@/types/api";


export const useResearch = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.research.list(params),
    queryFn: () => researchService.getAll(params),
  });
};

export const useResearchById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.research.detail(id),
    queryFn: () => researchService.getById(id),
    enabled: !!id,
  });
};
