"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SearchPageTitle from "@/components/atoms/search/SearchPageTitle";
import SelectRegions from "@/components/molecules/common/SelectRegion";
import { useLocation } from "@/contexts/locationSearch.context";
import { useSelectRegion } from "@/hooks";

export default function LocationSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLocation } = useLocation();

  const {
    actions: {
      handleLocationTypeClick,
      handleChipClick,
      handleThirdLevelClick,
    },
    states: {
      thirdLevelLocation,
      firstLevelLocation,
      secondLevelLocation,
      secondLevelLocations,
      selectedSecondLevelLocations,
    },
  } = useSelectRegion();

  useEffect(() => {
    const locationFromParams = searchParams.get("location");
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
      query.set("location", thirdLevelLocation);

      // 문자열로 변환 후 url에 포함시킴
      router.push(`/search?${query.toString()}`);
    }
  };

  return (
    <div className="bg-white p-5 xl:grid xl:grid-cols-3 xl:gap-4">
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
            thirdLevelLocation: thirdLevelLocation || "",
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
          type="button"
          className="m-3 mx-auto mb-10 flex w-full items-center justify-center rounded-2xl bg-main-color px-28 py-2 font-semibold text-white text-xl transition-colors duration-200 ease-in-out active:bg-gray-300 xl:mt-8 xl:w-1/2"
          onClick={handleSelectClick}
        >
          선택하기
        </button>
      </div>
    </div>
  );
}
