'use client';

import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import SelectRegions from '@/components/molecules/common/SelectRegion';
import { useLocation } from '@/contexts/locationSearch.context';
import { useSelectRegion } from '@/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LocationSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLocation } = useLocation();

  const {
    actions: { handleLocationTypeClick, handleChipClick, handleThirdLevelClick },
    states: {
      thirdLevelLocation,
      firstLevelLocation,
      secondLevelLocation,
      secondLevelLocations,
      selectedSecondLevelLocations,
    },
  } = useSelectRegion();

  useEffect(() => {
    const locationFromParams = searchParams.get('location');
    if (locationFromParams) {
      setLocation(locationFromParams);
    }
  }, [searchParams, setLocation]);

  useEffect(() => {
    setLocation(thirdLevelLocation || null);
  }, [thirdLevelLocation, setLocation]);

  const handleSelectClick = () => {
    if (thirdLevelLocation) {
      setLocation(thirdLevelLocation);
      const query = new URLSearchParams(window.location.search);
      query.set('location', thirdLevelLocation);

      // 문자열로 변환 후 url에 포함시킴
      router.push(`/search?${query.toString()}`);
    }
  };

  return (
    <div className="p-5 xl:grid xl:grid-cols-3 xl:gap-4 bg-white">
      <div className="xl:col-span-1">
        <SearchPageTitle
          title="어디로 떠나시나요?"
          description="지역, 국가, 도시를 1개 선택해주세요."
        />
      </div>
      <div className="xl:col-span-2">
        <SelectRegions
          states={{
            firstLevelLocation,
            secondLevelLocation,
            thirdLevelLocation: thirdLevelLocation || '',
            secondLevelLocations,
            selectedSecondLevelLocations,
          }}
          actions={{
            handleLocationTypeClick,
            handleChipClick,
            handleThirdLevelClick,
          }}
        />
        <button
          className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-2xl bg-main-color font-semibold text-white text-xl m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-1/2 xl:mt-8"
          onClick={handleSelectClick}
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
