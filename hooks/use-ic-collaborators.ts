import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { icCollaboratorsService } from "@/services/ic-collaborators/ic-collaborators.service";
import type { ICCollaboratorFilterParams } from "@/types/api";

export const useICCollaborators = (params?: ICCollaboratorFilterParams) => {
  return useQuery({
    queryKey: queryKeys.icCollaborators.list(params),
    queryFn: () => icCollaboratorsService.getAll(params),
  });
};

export const useICCollaboratorById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.icCollaborators.detail(id),
    queryFn: () => icCollaboratorsService.getById(id),
    enabled: !!id,
  });
};
