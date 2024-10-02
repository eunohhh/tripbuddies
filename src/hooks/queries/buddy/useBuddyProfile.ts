import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { useQuery } from '@tanstack/react-query';

export const fetchBuddyProfile = async (id: string) => {
  try {
    const data = await fetchWrapper<Buddy>(`/api/buddyProfile/buddy?id=${id}`, {
      method: 'GET',
      cache: 'no-store',
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export function useBuddyProfile(id: string) {
  return useQuery<Buddy, Error>({
    queryKey: [QUERY_KEY_BUDDY, id],
    queryFn: () => fetchBuddyProfile(id),
  });
}
