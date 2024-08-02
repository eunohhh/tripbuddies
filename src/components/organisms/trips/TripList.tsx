'use client';

import Loading from '@/app/(providers)/loading';
import TripCard from '@/components/molecules/trips/TripCard';
import useTripsQuery from '@/hooks/queries/useTripsQuery';
import React from 'react';

const TripList: React.FC = () => {
    const { data: trips, isPending, isError } = useTripsQuery();

    // 추후변경요망
    if (isError) return <div>Error</div>;
    if (isPending) return <Loading />;
    if (!trips) return <div>No trips</div>;

    return (
        <section className="w-full flex flex-col gap-4 justify-start items-center min-h-dvh bg-white pt-4">
            {trips.map(trip => (
                <TripCard key={trip.trip_id} trip={trip} mode="list" />
            ))}
        </section>
    );
};

export default TripList;
