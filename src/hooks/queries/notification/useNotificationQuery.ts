import { getNotifications } from '@/api-services/notification';
import { QUERY_KEY_NOTIFICATION } from '@/constants/query.constants';
import { Notification } from '@/types/Notification.types';
import { useQuery } from '@tanstack/react-query';

export function useNotificationQuery() {
  return useQuery<Notification[], Error>({
    queryKey: [QUERY_KEY_NOTIFICATION],
    queryFn: getNotifications,
  });
}
