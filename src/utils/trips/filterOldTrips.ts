import { Trip, TripWithContract } from '@/types/Trips.types';

export default function filterOldTrips<T extends Trip[] | TripWithContract[]>(trips: T) {
  return trips.filter((trip) => {
    const tripDate = new Date(trip.trip_start_date);
    return tripDate >= new Date();
  });
}
