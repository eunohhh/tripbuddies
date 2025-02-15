import { getSpecificStory } from '@/api-services/stories';
import StoryDetail from '@/components/organisms/stories/StoryDetail';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.types';
import Loading from '@app/loading';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react';

type StoryPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};

const StoryPage: React.FC<StoryPageProps> = async ({ params, searchParams }) => {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_STORY, id],
    // queryFn: () => getStories(),
    queryFn: () => getSpecificStory(id),
    staleTime: 1000 * 60 * 5,
  });
  const dehydratedState = dehydrate(queryClient);

  const stories = queryClient.getQueryData<StoryWithBuddies[]>([QUERY_KEY_STORY, id]);

  if (!stories) return <div>스토리가 없습니다.</div>;

  if (!id) return <div>스토리 아이디가 없습니다.</div>;

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <StoryDetail id={id} stories={stories} />
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
