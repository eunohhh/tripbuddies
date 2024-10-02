import { TripWithContract } from '@/types/Trips.types';

function filterTripList(tripsInfinite: TripWithContract[] | undefined, filter: string) {
  switch (filter) {
    case 'latest':
      return tripsInfinite?.sort((a, b) => {
        return new Date(b.trip_created_at).getTime() - new Date(a.trip_created_at).getTime();
      });
    case 'bookmark':
      return tripsInfinite?.sort((a, b) => {
        return b.trip_bookmarks_counts - a.trip_bookmarks_counts;
      });
    case 'imminent':
      return tripsInfinite?.sort((a, b) => {
        return new Date(b.trip_start_date).getTime() - new Date(a.trip_start_date).getTime();
      });
    case 'deadline':
      return tripsInfinite?.sort((a, b) => {
        return new Date(a.trip_start_date).getTime() - new Date(b.trip_start_date).getTime();
      });
    default:
      return tripsInfinite;
  }
}

export default filterTripList;
