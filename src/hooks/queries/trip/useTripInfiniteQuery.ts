import { getInfiniteTrips } from '@/api-services/trips/tripService';
import { QUERY_KEY_TRIP_INFINITE } from '@/constants/query.constants';
import { TripInfiniteQueryResponse } from '@/types/Trips.types';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useTripInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY_TRIP_INFINITE],
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: TripInfiniteQueryResponse,
      allPages: TripInfiniteQueryResponse[],
    ) => {
      if (lastPage.trips.length === 0) return null;
      return allPages.length;
    },
    queryFn: getInfiniteTrips,
    select: (data) => data.pages.flatMap((page) => page.trips),
  });
}
