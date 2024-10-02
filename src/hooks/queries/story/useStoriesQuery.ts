import { getStories } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddiesAndLikes } from '@/types/Story.types';
import { useQuery } from '@tanstack/react-query';

export function useStoriesQuery() {
  return useQuery<StoryWithBuddiesAndLikes[] | null, Error>({
    queryKey: [QUERY_KEY_STORY],
    queryFn: getStories,
  });
}
