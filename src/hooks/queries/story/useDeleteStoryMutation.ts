import { deleteStory } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteStoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STORY, 'specific'],
      });
    },
  });
}
