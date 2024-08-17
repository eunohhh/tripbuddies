import { useQuery } from '@tanstack/react-query';
import {
    QUERY_KEY_BUDDY,
    QUERY_KEY_BUDDY_RECOMMENDATION,
} from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import { getRecommendBuddies } from '@/api-services/auth/client';

export function useRecommendBuddiesQuery() {
    return useQuery<{ buddies: Buddy[]; isPending: boolean }, Error>({
        queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_BUDDY_RECOMMENDATION],
        queryFn: getRecommendBuddies,
    });
}
