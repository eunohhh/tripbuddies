"use client";

import React from "react";
import DateSearchButton from "@/components/atoms/search/DateSearchButton";
import LocationSearchButton from "@/components/atoms/search/LocationSearchButton";
import SearchInput from "@/components/atoms/search/SearchInput";

export type SearchBarsProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;

  thirdLevelLocation: string | null;
  setThirdLevelLocation: (locName: string) => void;

  startDateTimestamp: string;
  setStartDateTimestamp: React.Dispatch<React.SetStateAction<string>>;
  endDateTimestamp: string;
  setEndDateTimestamp: React.Dispatch<React.SetStateAction<string>>;

  handleShowResult: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const SearchBars: React.FC<SearchBarsProps> = ({
  searchInput,
  setSearchInput,
  startDateTimestamp,
  setStartDateTimestamp,
  endDateTimestamp,
  setEndDateTimestamp,

  thirdLevelLocation,
  setThirdLevelLocation,

  handleShowResult,
  handleKeyDown,
}) => {
  const handleLocationSelect = () => {
    if (thirdLevelLocation) {
      console.log("선택한 장소:", thirdLevelLocation);
      console.log("?", location);
      setThirdLevelLocation(thirdLevelLocation);
    }
  };

  return (
    <section className="mx-auto my-6 flex flex-col gap-[18px] xl:max-w-screen-xl xl:flex-row xl:items-center xl:justify-center xl:gap-5">
      <SearchInput
        value={searchInput}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />

      <DateSearchButton
        defaultStartDate={startDateTimestamp}
        defaultEndDate={endDateTimestamp}
        setDateChange={(start, end) => {
          setStartDateTimestamp(start);
          setEndDateTimestamp(end);
        }}
      />

      <LocationSearchButton onClick={handleLocationSelect} />

      <button
        type="button"
        className="mx-auto hidden items-center justify-center whitespace-nowrap rounded-xl bg-main-color font-semibold text-sm text-white transition-colors duration-200 ease-in-out active:bg-gray-300 xl:flex xl:w-[140px] xl:px-4 xl:py-2.5"
        onClick={handleShowResult}
      >
        검색하기
      </button>
    </section>
  );
};

export default SearchBars;
