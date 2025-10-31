"use client";

import React, { useEffect, useState } from "react";
import HomePageRecommendBuddiesList from "@/components/organisms/homepage/HomePageRecommendBuddiesList";
import { Buddy } from "@/types/Auth.types";

const medalIcons = ["/public/gif/medal.gif"];

const Skeleton: React.FC = () => {
  return (
    <div className="mx-1 mb-4 flex h-[75px] min-w-[200px] animate-pulse items-center rounded border border-gray-200 p-2">
      <div className="h-[60px] w-[60px] flex-shrink-0 rounded-lg bg-gray-300"></div>
      <div className="mx-1 flex w-full flex-col">
        <div className="mb-2 h-4 w-2/3 rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-3 w-1/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

const RankPage: React.FC = () => {
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const response = await fetch(
          "/api/buddyProfile/buddiesRecommendationList",
        );
        const data = await response.json();
        setBuddies(data.buddies);
        setLoading(false);
      } catch (error) {
        console.error("버디 추천 리스트 통신 오류 발생:", error);
        setLoading(false);
      }
    };
    fetchBuddies();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-md p-8">
      {/* <div className="flex items-center justify-between pb-6">
                <div>
                    <h1 className="text-4xl font-semibold text-gray-900">
                        버디즈 랭킹 TOP 10
                    </h1>
                    <span className="text-md text-gray-600">
                        🥇 TripBuddies 온도지수 TOP 10 버디즈를 소개합니다!
                    </span>
                </div>
            </div> */}

      {loading ? (
        Array.from({ length: 10 }, (_, index) => <Skeleton key={index} />)
      ) : (
        <div className="mb-4 flex flex-col gap-4">
          <HomePageRecommendBuddiesList
            buddies={buddies}
            className="mx-0 min-w-[335px] border-none shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default RankPage;
