import { getBookMark } from '@/api-services/trips';
import { QUERY_KEY_TRIP_BY_BOOKMARK } from '@/constants/query.constants';
import { BookMark, PartialBookMark } from '@/types/Trips.types';
import { useQuery } from '@tanstack/react-query';

export function useBookMarkQuery(mode: string, bookmark: PartialBookMark) {
  return useQuery<BookMark | null, Error, PartialBookMark>({
    queryKey: [QUERY_KEY_TRIP_BY_BOOKMARK, bookmark.bookmark_buddy_id, bookmark.bookmark_trip_id],
    queryFn: () => getBookMark(bookmark),
    enabled: !!bookmark.bookmark_buddy_id && !!bookmark.bookmark_trip_id && mode !== 'card',
  });
}
