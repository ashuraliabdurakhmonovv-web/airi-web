import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { instituteTuzilmaService } from "@/services/institute-tuzilma/institute-tuzilma.service";


export const useInstituteTuzilma = () => {
  return useQuery({
    queryKey: queryKeys.instituteTuzilma.list(),
    queryFn: instituteTuzilmaService.getAll,
  });
};

export const useInstituteTuzilmaById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.instituteTuzilma.detail(id),
    queryFn: () => instituteTuzilmaService.getById(id),
    enabled: !!id,
  });
};
