import { useQuery } from "@tanstack/react-query";
import { getTrips } from "@/api-services/trips";
import { QUERY_KEY_TRIPS } from "@/constants/query.constants";
import { TripInfiniteQueryResponse } from "@/types/Trips.types";

export function useTripsQuery() {
  return useQuery<TripInfiniteQueryResponse | null, Error>({
    queryKey: [QUERY_KEY_TRIPS],
    queryFn: getTrips,
  });
}
