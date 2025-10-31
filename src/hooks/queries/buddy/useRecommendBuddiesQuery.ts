import { useQuery } from "@tanstack/react-query";
import { getRecommendBuddies } from "@/api-services/auth/client";
import {
  QUERY_KEY_BUDDY,
  QUERY_KEY_BUDDY_RECOMMENDATION,
} from "@/constants/query.constants";
import { Buddy } from "@/types/Auth.types";

export function useRecommendBuddiesQuery() {
  return useQuery<{ buddies: Buddy[]; isPending: boolean }, Error>({
    queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_BUDDY_RECOMMENDATION],
    queryFn: getRecommendBuddies,
  });
}
