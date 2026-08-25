import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { conferencesService } from "@/services/conferences/conferences.service";
import type { ConferenceFilterParams } from "@/types/api";


export const useConferences = (params?: ConferenceFilterParams) => {
  return useQuery({
    queryKey: queryKeys.conferences.list(params),
    queryFn: () => conferencesService.getAll(params),
  });
};

export const useConferenceById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.conferences.detail(id),
    queryFn: () => conferencesService.getById(id),
    enabled: !!id,
  });
};

export const useConferenceBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.conferences.slug(slug),
    queryFn: () => conferencesService.getBySlug(slug),
    enabled: !!slug,
  });
};
