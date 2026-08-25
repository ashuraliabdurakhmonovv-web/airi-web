import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { doktoranturaService } from "@/services/doktorantura/doktorantura.service";
import type { PaginationParams } from "@/types/api";


export const useDoktorantura = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.doktorantura.list(params),
    queryFn: () => doktoranturaService.getAll(params),
  });
};

export const useDoktoranturaById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.doktorantura.detail(id),
    queryFn: () => doktoranturaService.getById(id),
    enabled: !!id,
  });
};
