import { useQuery } from "@tanstack/react-query";
import { getContract } from "@/api-services/contracts";
import { QUERY_KEY_TRIP_BY_CONTRACT } from "@/constants/query.constants";
import { TripsAndContracts } from "@/types/Contract.types";

export function useContractQuery({
  isBuddy,
  id,
}: {
  isBuddy: boolean;
  id: string | undefined;
}) {
  return useQuery<TripsAndContracts | null, Error>({
    queryKey: [QUERY_KEY_TRIP_BY_CONTRACT, id],
    queryFn: () => getContract(isBuddy, id),
    enabled: !!id,
  });
}
