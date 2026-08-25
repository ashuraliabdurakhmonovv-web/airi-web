import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { instituteEventsService } from "@/services/institute-events/institute-events.service";
import type { PaginationParams } from "@/types/api";


export const useInstituteEvents = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.instituteEvents.list(params),
    queryFn: () => instituteEventsService.getAll(params),
  });
};

export const useInstituteEventById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.instituteEvents.detail(id),
    queryFn: () => instituteEventsService.getById(id),
    enabled: !!id,
  });
};
