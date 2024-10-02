import { getStory } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.types';
import { useQuery } from '@tanstack/react-query';

export function useStoryQuery(id: string) {
  return useQuery<StoryWithBuddies, Error>({
    queryKey: [QUERY_KEY_STORY, id],
    queryFn: () => getStory(id),
  });
}
