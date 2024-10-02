'use client';

import LoaderOnly from '@/components/atoms/common/LoaderOnly';
import InfiniteScroll from '@/components/molecules/common/InfiniteScroll';
import { useTripInfiniteQuery } from '@/hooks/queries';
import filterTripList from '@/utils/trips/filterTripList';
import React, { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FilterIcon from '../../../../public/svg/Filter.svg';
import TripCard from './TripCard';

const FilterButton = [
  {
    title: '최신순',
    value: 'latest',
  },
  {
    title: '인기순',
    value: 'bookmark',
  },
  {
    title: '마감임박순',
    value: 'imminent',
  },
  {
    title: '마감여유순',
    value: 'deadline',
  },
];

const TripListMobile: React.FC = () => {
  const [filter, setFilter] = useState('latest');
  const [filterOpen, setFilterOpen] = useState(false);
  const { data: tripsInfinite, isFetching, fetchNextPage, hasNextPage } = useTripInfiniteQuery();

  const filteredTrips = useMemo(
    () => filterTripList(tripsInfinite, filter),
    [tripsInfinite, filter],
  );

  const handleSelectChange =
    (item: { title: string; value: string }) => (e: React.MouseEvent<HTMLButtonElement>) => {
      const selectedValue = item.value;
      if (selectedValue) setFilter(selectedValue);
    };

  // 추후수정요망
  if (!tripsInfinite) return <div>No trips</div>;
  if (!filteredTrips) return <div>No filtered trips</div>;

  return (
    <section className="w-full flex flex-col justify-center items-center h-auto pt-2">
      <div className="w-[90%] flex justify-between items-center">
        <div className="flex w-full h-full justify-center items-center flex-1 gap-1">
          {filterOpen &&
            FilterButton.map((item) => (
              <button
                key={item.value}
                className={twMerge(
                  'px-2 py-1 text-sm bg-white border border-grayscale-color-600 rounded-full shadow-sm text-grayscale-color-600',
                  item.value === filter
                    ? 'bg-primary-color-400 border border-primary-color-400 text-white'
                    : 'bg-white text-grayscale-color-600',
                )}
                onClick={handleSelectChange(item)}
              >
                {item.title}
              </button>
            ))}
        </div>
        <button
          className="flex justify-center items-center gap-0.5 rounded-full px-2 py-1 bg-primary-color-400 text-white shadow-sm"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          <span>필터</span>
          <FilterIcon />
        </button>
      </div>

      <div className="grid w-full mx-auto place-items-center grid-cols-1 xl:grid-cols-4 gap-3 pb-28 pt-2">
        <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
          {filteredTrips.map((item) => (
            <TripCard key={item.trip_id} trip={item} mode="list" />
          ))}
          {isFetching && (
            <div className="w-full h-20 flex justify-center items-center">
              <LoaderOnly />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default TripListMobile;
