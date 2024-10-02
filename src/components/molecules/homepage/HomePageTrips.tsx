import { TripWithContract } from '@/types/Trips.types';
import React from 'react';
import TripCard from '../../organisms/trips/TripCard';

type HomePageTripsProps = {
  trips: TripWithContract[];
};

const HomePageTrips: React.FC<HomePageTripsProps> = ({ trips }) => {
  return (
    <>
      {trips.map((trip) => (
        <TripCard key={trip.trip_id} trip={trip} mode="card" />
      ))}
    </>
  );
};

export default HomePageTrips;
