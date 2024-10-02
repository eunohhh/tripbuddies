import { postStoryLikes } from '@/api-services/stories';
import { QUERY_KEY_STORY_LIKES } from '@/constants/query.constants';
import { PartialStoryLikes, StoryLikes, StoryLikesData } from '@/types/Story.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useStoryLikesMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation<StoryLikes[] | null, Error, StoryLikesData>({
    mutationFn: (data: StoryLikesData) => postStoryLikes(data),
    onMutate: async (data: StoryLikesData) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_STORY_LIKES, id],
      });
      const previousLikes = queryClient.getQueryData<StoryLikes[]>([QUERY_KEY_STORY_LIKES, id]);
      // console.log('data ====>', data);
      if (!data.isLiked) {
        queryClient.setQueryData<PartialStoryLikes[]>([QUERY_KEY_STORY_LIKES, id], (old) =>
          old ? [...old, data as PartialStoryLikes] : [data as PartialStoryLikes],
        );
      } else {
        queryClient.setQueryData<PartialStoryLikes[]>([QUERY_KEY_STORY_LIKES, id], (old) => old);
      }

      return { previousLikes };
    },
    onError: (error, newLikes, context: unknown) => {
      console.error(error);
      const typedContext = context as { previousLikes: StoryLikes[] } | undefined;
      if (typedContext?.previousLikes) {
        queryClient.setQueryData<StoryLikes[]>(
          [QUERY_KEY_STORY_LIKES, id],
          typedContext.previousLikes,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STORY_LIKES, id],
      });
    },
  });
}
