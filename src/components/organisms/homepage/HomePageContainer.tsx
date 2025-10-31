"use client";

import { useEffect, useMemo, useRef } from "react";
import Navigate from "@/components/atoms/common/Navigate";
import HomePageStories from "@/components/molecules/homepage/HomePageStories";
import HomePageTitle from "@/components/molecules/homepage/HomePageTitle";
import HomePageTrips from "@/components/molecules/homepage/HomePageTrips";
import { useAuth, useTapScroll } from "@/hooks";
import { useHomeQueries } from "@/hooks/queries";
import { TripWithContract } from "@/types/Trips.types";
import filterOldTrips from "@/utils/trips/filterOldTrips";
import { showAlert } from "@/utils/ui/openCustomAlert";
import HomePageRecommendBuddiesList from "./HomePageRecommendBuddiesList";
import HomePageSearchBar from "./HomePageSearchBar";

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
      if (query.error) showAlert("error", query.error.message);
    });
  }, [queries]);

  const upcomingTrips = useMemo(() => {
    if (!trips.data) return [];
    return filterOldTrips(trips.data.trips as TripWithContract[]);
  }, [trips]);

  // if (queries.some(query => query.isPending)) return <DefaultLoader />;

  return (
    <div className="relative z-10 rounded-t-[32px] bg-white px-5 pt-4 pb-0">
      <HomePageSearchBar />
      <div className="relative z-10 mt-12 h-[200px] min-h-[200px] pb-2">
        <HomePageTitle
          className="relative mt-0 mb-0 h-[40%]"
          title="추천 인기 버디즈"
          buttonText="전체보기"
          description="버디즈에게 가장 인기있는 버디즈예요!"
          href="/rank"
        />
        <div
          className="scrollbar-hidden relative flex h-[60%] gap-[16px] overflow-x-scroll"
          ref={buddiesRef}
        >
          {buddies.data?.buddies && (
            <HomePageRecommendBuddiesList
              className="mx-0 min-w-[243px] border-none shadow-md xl:min-w-[258px]"
              buddies={buddies.data?.buddies}
            />
          )}
        </div>
        {createScrollLeft && createScrollRight && (
          <>
            <Navigate
              mode="before"
              onClick={createScrollLeft(buddiesRef)}
              className="top-[73%]"
            />
            <Navigate
              mode="after"
              onClick={createScrollRight(buddiesRef)}
              className="top-[73%]"
            />
          </>
        )}
      </div>

      <div className="relative z-10 mt-4 mb-2">
        <HomePageTitle
          title="버디즈 스토리"
          buttonText="전체보기"
          description="버디즈의 스토리를 확인하세요!"
          className="mt-0"
          href="/stories"
        />
        <div
          className="scrollbar-hidden relative z-10 flex gap-[16px] overflow-x-scroll"
          ref={storiesRef}
        >
          {stories.data?.stories && (
            <HomePageStories
              stories={stories.data?.stories}
              buddy={buddy || null}
            />
          )}
        </div>
        {createScrollLeft && createScrollRight && (
          <>
            <Navigate mode="before" onClick={createScrollLeft(storiesRef)} />
            <Navigate mode="after" onClick={createScrollRight(storiesRef)} />
          </>
        )}
      </div>

      <div className="relative z-10 mt-12 mb-0 h-[320px] min-h-[300px]">
        <HomePageTitle
          title="지금 모집중인 여정"
          buttonText="전체보기"
          description="함께 여행할 버디즈를 찾아보세요!"
          href="/trips"
          className="relative mt-0 mb-0 h-[25%]"
        />
        <div
          className="scrollbar-hidden relative flex h-[75%] min-h-[215px] gap-[16px] overflow-x-scroll px-[1px]"
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
