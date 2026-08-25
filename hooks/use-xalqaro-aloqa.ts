import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { xalqaroAloqaService } from "@/services/xalqaro-aloqa/xalqaro-aloqa.service";


export const useXalqaroAloqa = () => {
  return useQuery({
    queryKey: queryKeys.xalqaroAloqa.list(),
    queryFn: xalqaroAloqaService.getAll,
  });
};

export const useXalqaroAloqaById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.xalqaroAloqa.detail(id),
    queryFn: () => xalqaroAloqaService.getById(id),
    enabled: !!id,
  });
};
