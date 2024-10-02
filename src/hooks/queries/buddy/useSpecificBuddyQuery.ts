import { getSpecificBuddy } from '@/api-services/auth/client';
import { QUERY_KEY_BUDDY, QUERY_KEY_SPECIFIC_BUDDY } from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import { useQuery } from '@tanstack/react-query';

export function useSpecificBuddyQuery(id: string) {
  return useQuery<Buddy, Error>({
    queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_SPECIFIC_BUDDY, id],
    queryFn: () => getSpecificBuddy(id),
    enabled: !!id,
  });
}
