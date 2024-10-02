import { getStoryLikes } from '@/api-services/stories';
import { QUERY_KEY_STORY_LIKES } from '@/constants/query.constants';
import { StoryLikes } from '@/types/Story.types';
import { useQuery } from '@tanstack/react-query';

export function useStoryLikesQuery({ id }: { id: string }) {
  return useQuery<StoryLikes[], Error>({
    queryKey: [QUERY_KEY_STORY_LIKES, id],
    queryFn: () => getStoryLikes(id),
  });
}
