import { getTrips } from '@/api-services/trips';
import SearchPageContainer from '@/components/organisms/search/SearchPageContainer';
import { QUERY_KEY_TRIPS } from '@/constants/query.constants';
import { TripInfiniteQueryResponse } from '@/types/Trips.types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from '../loading';

export default async function SearchPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_TRIPS],
    queryFn: () => getTrips(),
    staleTime: 1000 * 60 * 5,
  });
  const dehydratedState = dehydrate(queryClient);

  const initialTrips: TripInfiniteQueryResponse | null =
    queryClient.getQueryData([QUERY_KEY_TRIPS]) || null;

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        {initialTrips && <SearchPageContainer initialTrips={initialTrips} />}
      </HydrationBoundary>
    </Suspense>
  );
}
