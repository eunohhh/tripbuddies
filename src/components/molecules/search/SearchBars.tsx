'use client';

import DateSearchButton from '@/components/atoms/search/DateSearchButton';
import LocationSearchButton from '@/components/atoms/search/LocationSearchButton';
import SearchInput from '@/components/atoms/search/SearchInput';
import React from 'react';

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
      console.log('선택한 장소:', thirdLevelLocation);
      console.log('?', location);
      setThirdLevelLocation(thirdLevelLocation);
    }
  };

  return (
    <section className="flex flex-col mx-auto my-6 gap-[18px] xl:flex-row xl:items-center xl:justify-center xl:max-w-screen-xl xl:gap-5">
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
        className="hidden xl:flex xl:w-[140px] xl:px-4 xl:py-2.5 rounded-xl bg-main-color justify-center items-center mx-auto font-semibold text-white text-sm transition-colors duration-200 ease-in-out active:bg-gray-300 whitespace-nowrap"
        onClick={handleShowResult}
      >
        검색하기
      </button>
    </section>
  );
};

export default SearchBars;
