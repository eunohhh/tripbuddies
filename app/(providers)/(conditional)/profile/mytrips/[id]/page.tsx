'use client';

import BookmarkedTrips from '@/components/molecules/profile/myTrips/BookmarkedTrips';
import CreatedTrips from '@/components/molecules/profile/myTrips/CreatedTrips';
import ParticipatedTrips from '@/components/molecules/profile/myTrips/ParticipatedTrips';
import { MyTripsAndContracts } from '@/types/Contract.types';
import { TripWithContract } from '@/types/Trips.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyTrips() {
  const { id } = useParams<{ id: string }>();
  const [trips, setTrips] = useState<MyTripsAndContracts>({
    created: [],
    participated: [],
    bookmarked: [],
  });

  const [view, setView] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await fetchWrapper<MyTripsAndContracts>(`/api/trips/my/${id}`, {
          method: 'GET',
        });

        const bookmarkedTrips = await fetchWrapper<TripWithContract[]>(
          `/api/trips/bookmarks?bookmark_buddy_id=${id}`,
          {
            method: 'GET',
          },
        );

        const newTrips = {
          ...data,
          bookmarked: bookmarkedTrips,
        };

        setTrips(newTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    if (id) {
      fetchTrips();
    }

    const queryParams = new URLSearchParams(window.location.search);
    const viewParam = queryParams.get('view');
    setView(viewParam);
  }, [id]);

  console.log(trips);

  return (
    <>
      {/* TODO: BookmarkedTrips는 최초 와이어프레임에 없던 지라 MyTripsAndContracts에서
            대응하지 못해 데이터를 직접 하달하고 있는데 리팩토링 필요함 */}
      {/* TODO: CreatedTrips, ParticipatedTrips 스켈레톤 처리 */}
      {view === 'created' && trips.created.length > 0 && <CreatedTrips created={trips.created} />}
      {view === 'participated' && trips.participated.length > 0 && (
        <ParticipatedTrips participated={trips.participated} />
      )}
      {view === 'bookmarked' && trips.bookmarked.length > 0 && (
        <BookmarkedTrips currentUserId={id as string} />
      )}
    </>
  );
}
