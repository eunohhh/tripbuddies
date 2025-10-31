"use client";

import TripCard from "@/components/organisms/trips/TripCard";
import { useMyBookMarksQuery } from "@/hooks/queries/trip/useMyBookMarksQuery";
import { TripWithContract } from "@/types/Trips.types";

type BookmarkedTripsProps = {
  currentUserId: string;
};

function TripCardSkeleton() {
  return (
    <div className="h-[215px] min-h-[215px] min-w-[211px] animate-pulse rounded-lg bg-gray-200 xl:min-w-[252px]">
      <div className="h-[84%] w-full rounded-t-lg bg-gray-300"></div>
      <div className="h-[16%] w-full rounded-b-lg bg-gray-400"></div>
    </div>
  );
}

function BookmarkedTrips({ currentUserId }: BookmarkedTripsProps) {
  const { data, isPending } = useMyBookMarksQuery(currentUserId);

  return (
    <div>
      {isPending ? (
        <div className="mx-2 my-2 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <TripCardSkeleton key={index} />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="mx-2 my-2 grid grid-cols-1 gap-4 xl:grid-cols-2">
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
