import { getSpecificStory } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.types';
import { useQuery } from '@tanstack/react-query';

export function useSpecificStoryQuery(id: string) {
  return useQuery<StoryWithBuddies[], Error>({
    queryKey: [QUERY_KEY_STORY, id],
    queryFn: () => getSpecificStory(id),
    enabled: !!id,
  });
}
