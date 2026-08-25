import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { iqtidorliYoshlarService } from "@/services/iqtidorli-yoshlar/iqtidorli-yoshlar.service";
import type { PaginationParams } from "@/types/api";


export const useIqtidorliYoshlar = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.iqtidorliYoshlar.list(params),
    queryFn: () => iqtidorliYoshlarService.getAll(params),
  });
};

export const useIqtidorliYoshlarById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.iqtidorliYoshlar.detail(id),
    queryFn: () => iqtidorliYoshlarService.getById(id),
    enabled: !!id,
  });
};
