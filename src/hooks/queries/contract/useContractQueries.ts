import { useQueries } from "@tanstack/react-query";
import { getContract } from "@/api-services/contracts";
import { QUERY_KEY_CONTRACT } from "@/constants/query.constants";

export function useContractQueries(tripIds: string[]) {
  return useQueries({
    queries:
      tripIds.length > 0
        ? tripIds.map((tripId) => ({
            queryKey: [QUERY_KEY_CONTRACT, tripId],
            queryFn: () => getContract(false, tripId),
          }))
        : [],
  });
}
