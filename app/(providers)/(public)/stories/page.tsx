import { getStories } from '@/api-services/stories';
import StoryList from '@/components/organisms/stories/StoryList';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';

const StoriesPage: React.FC = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_STORY],
    queryFn: () => getStories(),
    staleTime: 1000 * 60 * 5,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <StoryList />
      </HydrationBoundary>
    </Suspense>
  );
};

export default StoriesPage;
