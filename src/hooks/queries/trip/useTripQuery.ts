import { getTrip } from '@/api-services/trips';
import { QUERY_KEY_TRIP } from '@/constants/query.constants';
import { TripWithContract } from '@/types/Trips.types';
import { useQuery } from '@tanstack/react-query';

export function useTripQuery(id: string | null) {
  return useQuery<TripWithContract, Error>({
    queryKey: [QUERY_KEY_TRIP, id],
    queryFn: () => getTrip(id),
    enabled: !!id,
  });
}
