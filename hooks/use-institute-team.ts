import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { instituteTeamService } from "@/services/institute-team/institute-team.service";
import type { PaginationParams } from "@/types/api";


export const useInstituteTeam = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.instituteTeam.list(params),
    queryFn: () => instituteTeamService.getAll(params),
  });
};

export const useInstituteTeamById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.instituteTeam.detail(id),
    queryFn: () => instituteTeamService.getById(id),
    enabled: !!id,
  });
};
