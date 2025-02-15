import { getContract } from '@/api-services/contracts';
import { getBuddyTripStory } from '@/api-services/home';
import FloatingButton from '@/components/atoms/home/FloatingButton';
import HomePageBanner from '@/components/molecules/homepage/HomePageBanner';
import HomePageContainer from '@/components/organisms/homepage/HomePageContainer';
import {
  QUERY_KEY_BUDDIES,
  QUERY_KEY_STORIES,
  QUERY_KEY_TRIP_BY_CONTRACT,
  QUERY_KEY_TRIPS,
} from '@/constants/query.constants';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';

const HomePage: React.FC = async () => {
  const userId = getUserFromHeader();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_BUDDIES],
    queryFn: () => getBuddyTripStory(QUERY_KEY_BUDDIES),
    staleTime: 1000 * 60 * 5,
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_TRIPS],
    queryFn: () => getBuddyTripStory(QUERY_KEY_TRIPS),
    staleTime: 1000 * 60 * 5,
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_STORIES],
    queryFn: () => getBuddyTripStory(QUERY_KEY_STORIES),
    staleTime: 1000 * 60 * 5,
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_TRIP_BY_CONTRACT, userId],
    queryFn: () => getContract(true, userId || ''),
    staleTime: 1000 * 60 * 5,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="relative h-full w-full">
      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydratedState}>
          <HomePageBanner />
          <HomePageContainer />
          <FloatingButton />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
};

export default HomePage;
