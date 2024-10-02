import { patchBuddyInfo } from '@/api-services/auth/client';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy, PartialBuddy } from '@/types/Auth.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateBuddyMutation() {
  const queryClient = useQueryClient();
  return useMutation<Buddy, Error, { buddyInfo?: PartialBuddy | null; imageFile?: File | null }>({
    mutationFn: ({
      buddyInfo = null,
      imageFile = null,
    }: {
      buddyInfo?: PartialBuddy | null;
      imageFile?: File | null;
    }) => patchBuddyInfo({ buddyInfo, imageFile }),
    onSuccess: (buddyInfo: Buddy) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BUDDY, buddyInfo.buddy_id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BUDDY],
      });
    },
  });
}
