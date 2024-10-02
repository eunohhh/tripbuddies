import TripCard from '@/components/organisms/trips/TripCard';
import { TripWithContract } from '@/types/Trips.types';

function CreatedTrips(trips: { created: TripWithContract[] }) {
  return (
    <div>
      {trips.created.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 my-2 mx-2 gap-4">
          {trips.created.map((trip: TripWithContract) => (
            <TripCard key={trip.trip_id} trip={trip} mode="card" />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">만든 여정이 없습니다.</div>
      )}
    </div>
  );
}

export default CreatedTrips;
