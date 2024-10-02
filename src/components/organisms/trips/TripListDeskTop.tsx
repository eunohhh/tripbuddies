'use client';

import Loading from '@/app/(providers)/loading';
import { useTripsQuery } from '@/hooks/queries';
import { sliceArrayByLimit } from '@/utils/common/sliceArrayByLimits';
import filterTripList from '@/utils/trips/filterTripList';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import TripCard from './TripCard';

const TripListDesktop: React.FC = () => {
  const [filter, setFilter] = useState('latest');
  const { data: tripsData, isPending, error } = useTripsQuery();

  const [paginationIndex, setPaginationIndex] = useState(0);
  const [pagination, setPagination] = useState(1);

  const filteredTrips = useMemo(() => {
    const filteredTrips = filterTripList(tripsData?.trips, filter);
    const { slicedDataArray } = sliceArrayByLimit(filteredTrips ?? [], 8);
    return slicedDataArray;
  }, [tripsData, filter]);

  const slicedPageArray = useMemo(() => {
    const { slicedPageArray } = sliceArrayByLimit(tripsData?.totalPages ?? 0, 5);
    return slicedPageArray;
  }, [tripsData]);

  const handlePaginationIndex = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      const next = event.currentTarget.dataset.next;
      if (next === 'before') {
        if (paginationIndex > 0) setPaginationIndex((prev) => prev - 1);
      } else {
        if (slicedPageArray.length > paginationIndex + 1) setPaginationIndex((prev) => prev + 1);
      }
    },
    [paginationIndex, slicedPageArray],
  );

  const handlePagination = (index: number) => {
    setPagination(index);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilter(selectedValue);
  };

  useEffect(() => {
    if (error) {
      showAlert('error', '여정 조회에 실패했습니다.');
    }
  }, [error]);

  // 추후수정요망
  if (isPending) return <Loading />;
  if (!tripsData) return <div>No trips</div>;

  return (
    <section className="w-full flex flex-col justify-center items-center h-[calc(100dvh-57px-54px)] pt-4 mb-10 xl:h-[calc(100dvh-100px)] xl:pt-0 xl:mb-0 xl:gap-8">
      <div className="w-full justify-end items-center hidden xl:flex">
        <button className="flex justify-between items-center border-1 border-black rounded-md p-1">
          <select
            className="w-full focus:outline-none"
            value={filter}
            onChange={handleSelectChange}
          >
            <option value="latest">최신순</option>
            <option value="bookmark">인기순</option>
            <option value="imminent">마감임박순</option>
            <option value="deadline">마감여유순</option>
          </select>
        </button>
      </div>

      <div className="grid w-full mx-auto grid-cols-1 xl:grid-cols-4 gap-3">
        {filteredTrips[pagination - 1].map((item) => (
          <TripCard key={item.trip_id} trip={item} mode="list" />
        ))}
      </div>

      <div className="w-full justify-center items-center hidden xl:flex">
        <div className="flex justify-center items-center gap-3">
          <RxTriangleLeft
            className="cursor-pointer text-2xl"
            data-next="before"
            onClick={handlePaginationIndex}
          />
          <div className="flex justify-center items-center gap-3 min-w-[100px]">
            {slicedPageArray[paginationIndex].map((page) => (
              <button
                key={page}
                className={twMerge('text-black', page === pagination && 'text-primary-color-400')}
                onClick={() => handlePagination(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <RxTriangleRight
            className="cursor-pointer text-2xl"
            data-next="after"
            onClick={handlePaginationIndex}
          />
        </div>
      </div>
    </section>
  );
};

export default TripListDesktop;
