import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { rahbariyatQabulService } from "@/services/rahbariyat-qabul/rahbariyat-qabul.service";
import type { PaginationParams } from "@/types/api";


export const useRahbariyatQabul = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.rahbariyatQabul.list(params),
    queryFn: () => rahbariyatQabulService.getAll(params),
  });
};

export const useRahbariyatQabulById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.rahbariyatQabul.detail(id),
    queryFn: () => rahbariyatQabulService.getById(id),
    enabled: !!id,
  });
};
