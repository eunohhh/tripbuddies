import { getSpecificBuddy } from '@/api-services/auth/client';
import { QUERY_KEY_BUDDY, QUERY_KEY_SPECIFIC_BUDDY } from '@/constants/query.constants';
import { useQueries } from '@tanstack/react-query';

export function useBuddyQueries(buddyIds: string[]) {
  return useQueries({
    queries: buddyIds.map((buddyId) => ({
      queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_SPECIFIC_BUDDY, buddyId],
      queryFn: () => getSpecificBuddy(buddyId),
      enabled: !!buddyId,
    })),
  });
}
