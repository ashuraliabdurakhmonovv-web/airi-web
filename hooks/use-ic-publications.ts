import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { icPublicationsService } from "@/services/ic-publications/ic-publications.service";
import type { ICPublicationFilterParams } from "@/types/api";

export const useICPublications = (params?: ICPublicationFilterParams) => {
  return useQuery({
    queryKey: queryKeys.icPublications.list(params),
    queryFn: () => icPublicationsService.getAll(params),
  });
};

export const useICPublicationById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.icPublications.detail(id),
    queryFn: () => icPublicationsService.getById(id),
    enabled: !!id,
  });
};
