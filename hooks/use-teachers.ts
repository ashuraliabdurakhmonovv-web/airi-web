import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { teachersService } from "@/services/teachers/teachers.service";
import type { PaginationParams } from "@/types/api";


export const useTeachers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.teachers.list(params),
    queryFn: () => teachersService.getAll(params),
  });
};

export const useTeacherById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.teachers.detail(id),
    queryFn: () => teachersService.getById(id),
    enabled: !!id,
  });
};
