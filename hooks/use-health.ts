import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { healthService } from "@/services/health/health.service";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: healthService.check,
  });
};
