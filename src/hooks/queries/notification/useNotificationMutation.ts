import { postNotification } from '@/api-services/notification';
import { Notification, PartialNotification } from '@/types/Notification.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useNotificationMutation() {
  const queryClient = useQueryClient();
  return useMutation<Notification, Error, PartialNotification>({
    mutationFn: (notification) => postNotification(notification),
    // onSuccess: () => {
    //     queryClient.invalidateQueries({
    //         queryKey: [QUERY_KEY_NOTIFICATION],
    //     });
    // },
  });
}
