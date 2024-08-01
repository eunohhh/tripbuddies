import { getStory } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';
import StoryList from '@/components/organisms/stories/StoryList';

const StoriesPage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_STORY],
        queryFn: () => getStory(),
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
