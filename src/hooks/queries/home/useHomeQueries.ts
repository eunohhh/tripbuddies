import { getBuddyTripStory } from '@/api-services/home';
import { QUERY_KEY_BUDDIES, QUERY_KEY_STORIES, QUERY_KEY_TRIPS } from '@/constants/query.constants';
import { useQueries } from '@tanstack/react-query';

const homeQueriesArray = [
  {
    queryKey: [QUERY_KEY_BUDDIES],
  },
  {
    queryKey: [QUERY_KEY_TRIPS],
  },
  {
    queryKey: [QUERY_KEY_STORIES],
  },
];

export function useHomeQueries() {
  return useQueries({
    queries: homeQueriesArray.map((query) => ({
      queryKey: query.queryKey,
      queryFn: () => getBuddyTripStory(query.queryKey[0]),
      // staleTime: 1000 * 60 * 5,
    })),
  });
}
