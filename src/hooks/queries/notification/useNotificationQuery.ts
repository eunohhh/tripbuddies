import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/api-services/notification";
import { QUERY_KEY_NOTIFICATION } from "@/constants/query.constants";
import { Notification } from "@/types/Notification.types";

export function useNotificationQuery({ buddyId }: { buddyId: string }) {
  return useQuery<Notification[], Error>({
    queryKey: [QUERY_KEY_NOTIFICATION],
    queryFn: () => getNotifications({ buddyId }),
    enabled: !!buddyId,
  });
}
