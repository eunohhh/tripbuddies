import { TripWithContract } from '@/types/Trips.types';

export const filterAndSortTrips = (
  trips: TripWithContract[],
  selectedThemes: string[],
): TripWithContract[] => {
  return trips
    .map((trip) => {
      // 선택된 테마와 일치하는 테마의 갯수
      const tripThemes = [trip.trip_theme1, trip.trip_theme2, trip.trip_theme3];
      const matchingCount = selectedThemes.filter((theme) => tripThemes.includes(theme)).length;
      return { trip, matchingCount };
    })
    .filter(({ matchingCount }) => matchingCount > 0)
    .sort((a, b) => b.matchingCount - a.matchingCount)
    .map(({ trip }) => trip);
};
// 일치하는 항목만 필터링
// 일치하는 수에 따라 정렬
// trip 객체만 반환

export const filterAndSortTripsBuddies = (
  trips: TripWithContract[],
  selectedBuddyThemes: string[],
): TripWithContract[] => {
  return trips
    .map((trip) => {
      const buddyThemes = [
        trip.trip_wanted_buddies1,
        trip.trip_wanted_buddies2,
        trip.trip_wanted_buddies3,
      ];
      const matchingCount = selectedBuddyThemes.filter((theme) =>
        buddyThemes.includes(theme),
      ).length;
      return { trip, matchingCount };
    })
    .filter(({ matchingCount }) => matchingCount > 0)
    .sort((a, b) => b.matchingCount - a.matchingCount)
    .map(({ trip }) => trip);
};
