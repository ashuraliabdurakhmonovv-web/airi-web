import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { aboutInstituteService } from "@/services/about-institute/about-institute.service";


export const useAboutInstitute = () => {
  return useQuery({
    queryKey: queryKeys.aboutInstitute.list(),
    queryFn: aboutInstituteService.getAll,
  });
};
