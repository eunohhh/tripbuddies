'use client';

import HomePageRecommendBuddiesList from '@/components/organisms/homepage/HomePageRecommendBuddiesList';
import { Buddy } from '@/types/Auth.types';
import React, { useEffect, useState } from 'react';

const medalIcons = ['/public/gif/medal.gif'];

const Skeleton: React.FC = () => {
  return (
    <div className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 flex items-center p-2 animate-pulse mb-4">
      <div className="flex-shrink-0 w-[60px] h-[60px] bg-gray-300 rounded-lg"></div>
      <div className="mx-1 flex flex-col w-full">
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
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
        const response = await fetch('/api/buddyProfile/buddiesRecommendationList');
        const data = await response.json();
        setBuddies(data.buddies);
        setLoading(false);
      } catch (error) {
        console.error('버디 추천 리스트 통신 오류 발생:', error);
        setLoading(false);
      }
    };
    fetchBuddies();
  }, []);

  return (
    <div className="p-8 rounded-md w-full max-w-4xl mx-auto">
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
