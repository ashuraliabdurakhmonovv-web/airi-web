import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { graduatesService } from "@/services/graduates/graduates.service";
import type { PaginationParams } from "@/types/api";


export const useGraduates = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.graduates.list(params),
    queryFn: () => graduatesService.getAll(params),
  });
};

export const useGraduateById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.graduates.detail(id),
    queryFn: () => graduatesService.getById(id),
    enabled: !!id,
  });
};
