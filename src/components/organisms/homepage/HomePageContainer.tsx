'use client';

import Navigate from '@/components/atoms/common/Navigate';
import HomePageStories from '@/components/molecules/homepage/HomePageStories';
import HomePageTitle from '@/components/molecules/homepage/HomePageTitle';
import HomePageTrips from '@/components/molecules/homepage/HomePageTrips';
import { useAuth, useTapScroll } from '@/hooks';
import { useHomeQueries } from '@/hooks/queries';
import { TripWithContract } from '@/types/Trips.types';
import filterOldTrips from '@/utils/trips/filterOldTrips';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useEffect, useMemo, useRef } from 'react';
import HomePageRecommendBuddiesList from './HomePageRecommendBuddiesList';
import HomePageSearchBar from './HomePageSearchBar';

const HomePageContainer = () => {
  const buddiesRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const tripsRef = useRef<HTMLDivElement>(null);

  const { createScrollLeft, createScrollRight } =
    useTapScroll({
      refs: [buddiesRef, storiesRef, tripsRef],
    }) ?? {};

  const { buddy } = useAuth();
  const queries = useHomeQueries();

  const [buddies, trips, stories] = queries;

  useEffect(() => {
    queries.forEach((query) => {
      if (query.error) showAlert('error', query.error.message);
    });
  }, [queries]);

  const upcomingTrips = useMemo(() => {
    if (!trips.data) return [];
    return filterOldTrips(trips.data.trips as TripWithContract[]);
  }, [trips]);

  // if (queries.some(query => query.isPending)) return <DefaultLoader />;

  return (
    <div className="rounded-t-[32px] bg-white px-5 pt-4 pb-0 z-10 relative">
      <HomePageSearchBar />
      <div className="mt-12 pb-2 relative z-10 min-h-[200px] h-[200px]">
        <HomePageTitle
          className="relative mt-0 mb-0 h-[40%]"
          title="추천 인기 버디즈"
          buttonText="전체보기"
          description="버디즈에게 가장 인기있는 버디즈예요!"
          href="/rank"
        />
        <div
          className="relative overflow-x-scroll scrollbar-hidden flex gap-[16px] h-[60%]"
          ref={buddiesRef}
        >
          {buddies.data?.buddies && (
            <HomePageRecommendBuddiesList
              className="min-w-[243px] mx-0 border-none shadow-md xl:min-w-[258px]"
              buddies={buddies.data?.buddies}
            />
          )}
        </div>
        {createScrollLeft && createScrollRight && (
          <>
            <Navigate mode="before" onClick={createScrollLeft(buddiesRef)} className="top-[73%]" />
            <Navigate mode="after" onClick={createScrollRight(buddiesRef)} className="top-[73%]" />
          </>
        )}
      </div>

      <div className="mt-4 mb-2 relative z-10">
        <HomePageTitle
          title="버디즈 스토리"
          buttonText="전체보기"
          description="버디즈의 스토리를 확인하세요!"
          className="mt-0"
          href="/stories"
        />
        <div
          className="overflow-x-scroll scrollbar-hidden relative flex gap-[16px] z-10"
          ref={storiesRef}
        >
          {stories.data?.stories && (
            <HomePageStories stories={stories.data?.stories} buddy={buddy || null} />
          )}
        </div>
        {createScrollLeft && createScrollRight && (
          <>
            <Navigate mode="before" onClick={createScrollLeft(storiesRef)} />
            <Navigate mode="after" onClick={createScrollRight(storiesRef)} />
          </>
        )}
      </div>

      <div className="mt-12 mb-0 relative z-10 min-h-[300px] h-[320px]">
        <HomePageTitle
          title="지금 모집중인 여정"
          buttonText="전체보기"
          description="함께 여행할 버디즈를 찾아보세요!"
          href="/trips"
          className="relative mt-0 mb-0 h-[25%]"
        />
        <div
          className="relative overflow-x-scroll scrollbar-hidden flex gap-[16px] min-h-[215px] px-[1px] h-[75%]"
          ref={tripsRef}
        >
          {upcomingTrips.length > 0 && (
            <HomePageTrips trips={upcomingTrips as TripWithContract[]} />
          )}
        </div>
        {createScrollLeft && createScrollRight && (
          <>
            <Navigate mode="before" onClick={createScrollLeft(tripsRef)} />
            <Navigate mode="after" onClick={createScrollRight(tripsRef)} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePageContainer;
