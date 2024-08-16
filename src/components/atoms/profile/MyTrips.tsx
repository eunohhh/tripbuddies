'use client';

import React, { useEffect, useRef, useState } from 'react';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { MyTripsAndContracts } from '@/types/Contract.types';
import CreatedTrips from '@/components/molecules/profile/myTrips/CreatedTrips';
import ParticipatedTrips from '@/components/molecules/profile/myTrips/ParticipatedTrips';

type MyTripsProps = {
    id: string;
};

export default function MyTrips({ id }: MyTripsProps) {
    const [trips, setTrips] = useState<MyTripsAndContracts>({
        created: [],
        participated: [],
    });

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await fetchWrapper<MyTripsAndContracts>(
                    `/api/trips/my/${id}`,
                    {
                        method: 'GET',
                    },
                );
                setTrips(data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [id]);

    return (
        <>
            <CreatedTrips created={trips.created} />
            <ParticipatedTrips participated={trips.participated} />
        </>
    );
}
