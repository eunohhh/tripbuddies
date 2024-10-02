'use client';

import TripCard from '@/components/organisms/trips/TripCard';
import { useMyBookMarksQuery } from '@/hooks/queries/trip/useMyBookMarksQuery';
import { TripWithContract } from '@/types/Trips.types';

type BookmarkedTripsProps = {
  currentUserId: string;
};

function TripCardSkeleton() {
  return (
    <div className="h-[215px] min-h-[215px] rounded-lg min-w-[211px] xl:min-w-[252px] bg-gray-200 animate-pulse">
      <div className="h-[84%] w-full bg-gray-300 rounded-t-lg"></div>
      <div className="h-[16%] w-full bg-gray-400 rounded-b-lg"></div>
    </div>
  );
}

function BookmarkedTrips({ currentUserId }: BookmarkedTripsProps) {
  const { data, isPending } = useMyBookMarksQuery(currentUserId);

  return (
    <div>
      {isPending ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 my-2 mx-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <TripCardSkeleton key={index} />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 my-2 mx-2 gap-4">
          {data.map((trip: TripWithContract) => (
            <TripCard
              key={trip.trip_id}
              trip={{
                ...trip,
                contract: trip.contract || [],
              }}
              mode="card"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">찜한 여정이 없습니다.</div>
      )}
    </div>
  );
}

export default BookmarkedTrips;
