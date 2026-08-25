import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { ilmiyKengashService } from "@/services/ilmiy-kengash/ilmiy-kengash.service";
import type { PaginationParams } from "@/types/api";


export const useIlmiyKengash = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.ilmiyKengash.list(params),
    queryFn: () => ilmiyKengashService.getAll(params),
  });
};

export const useIlmiyKengashById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.ilmiyKengash.detail(id),
    queryFn: () => ilmiyKengashService.getById(id),
    enabled: !!id,
  });
};
