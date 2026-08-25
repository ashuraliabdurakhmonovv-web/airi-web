import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { projectsService } from "@/services/projects/projects.service";
import type { PaginationParams } from "@/types/api";


export const useProjects = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.projects.list(params),
    queryFn: () => projectsService.getAll(params),
  });
};

export const useProjectById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectsService.getById(id),
    enabled: !!id,
  });
};
