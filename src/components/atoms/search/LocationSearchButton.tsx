"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useLocation } from "@/contexts/locationSearch.context";

type LocationSearchMainPageProps = {
  onClick: () => void;
};

const LocationSearchButton: React.FC<LocationSearchMainPageProps> = ({
  onClick,
}) => {
  const { location } = useLocation();
  const router = useRouter();

  const handleClick = () => {
    // 현재 URL 쿼리 파라미터를 가져옴
    const currentQuery = new URLSearchParams(window.location.search);
    if (location) {
      // 현재 선택 장소를 쿼리 파라미터에 추가
      currentQuery.set("location", location);
    } else {
      currentQuery.delete("location");
    }

    // 페이지를 이동할 때 쿼리 파라미터를 포함한다
    router.push(`/search/location?${currentQuery.toString()}`);
    onClick();
  };

  return (
    <div className="box-border flex flex-row gap-2 rounded-2xl bg-grayscale-color-85 py-1.5 pl-3 xl:w-[300px]">
      <div className="relative flex items-center">
        <Image src="/svg/Place.svg" alt="Place" width={20} height={20} />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="relative flex h-full w-full items-center"
      >
        <span>
          {location
            ? `현재 선택된 장소: ${location}`
            : "지역, 국가를 찾아보세요"}
        </span>
      </button>
    </div>
  );
};

export default LocationSearchButton;
