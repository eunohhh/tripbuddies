import { getSpecificStory } from '@/api-services/stories';
import Loading from '@/app/loading';
import StoryDetail from '@/components/organisms/stories/StoryDetail';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.types';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';

type StoryPageProps = {
    params: { nickname: string };
    searchParams: { [key: string]: string | undefined };
};

const StoryPage: React.FC<StoryPageProps> = async ({
    params,
    searchParams,
}) => {
    const { nickname } = params;
    const { id } = searchParams;

    if (!id) return <div>아이디가 없습니다.</div>;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_STORY, id],
        // queryFn: () => getStories(),
        queryFn: () => getSpecificStory(id),
    });
    const dehydratedState = dehydrate(queryClient);

    const stories = queryClient.getQueryData<StoryWithBuddies[]>([
        QUERY_KEY_STORY,
        id,
    ]);

    if (!stories) return <div>스토리가 없습니다.</div>;

    if (!id) return <div>스토리 아이디가 없습니다.</div>;

    return (
        <Suspense fallback={<Loading />}>
            <HydrationBoundary state={dehydratedState}>
                {/* <StoryDetail nickname={nickname} id={storyId} stories={mapped} /> */}
                <StoryDetail nickname={nickname} id={id} stories={stories} />
            </HydrationBoundary>
        </Suspense>
    );
};

export default StoryPage;
// const sortedStories = groupStoriesByBuddyId(stories);
// const [mapped] = Object.values(sortedStories).filter(stories => {
//     const buddyNickname = stories[0].buddies.buddy_nickname.trim();
//     const decodedNickname = decodeURIComponent(nickname);
//     return buddyNickname === decodedNickname;
// });
