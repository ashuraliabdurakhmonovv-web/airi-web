import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { partnersService } from "@/services/partners/partners.service";
import type { PaginationParams } from "@/types/api";


export const usePartners = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.partners.list(params),
    queryFn: () => partnersService.getAll(params),
  });
};

export const usePartnerById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.partners.detail(id),
    queryFn: () => partnersService.getById(id),
    enabled: !!id,
  });
};
