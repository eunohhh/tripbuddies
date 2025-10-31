"use client";

import React, { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import LoaderOnly from "@/components/atoms/common/LoaderOnly";
import { Filter as FilterIcon } from "@/components/icons/Filter";
import InfiniteScroll from "@/components/molecules/common/InfiniteScroll";
import { useTripInfiniteQuery } from "@/hooks/queries";
import filterTripList from "@/utils/trips/filterTripList";
import TripCard from "./TripCard";

const FilterButton = [
  {
    title: "최신순",
    value: "latest",
  },
  {
    title: "인기순",
    value: "bookmark",
  },
  {
    title: "마감임박순",
    value: "imminent",
  },
  {
    title: "마감여유순",
    value: "deadline",
  },
];

const TripListMobile: React.FC = () => {
  const [filter, setFilter] = useState("latest");
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    data: tripsInfinite,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useTripInfiniteQuery();

  const filteredTrips = useMemo(
    () => filterTripList(tripsInfinite, filter),
    [tripsInfinite, filter],
  );

  const handleSelectChange =
    (item: { title: string; value: string }) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const selectedValue = item.value;
      if (selectedValue) setFilter(selectedValue);
    };

  // 추후수정요망
  if (!tripsInfinite) return <div>No trips</div>;
  if (!filteredTrips) return <div>No filtered trips</div>;

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center pt-2">
      <div className="flex w-[90%] items-center justify-between">
        <div className="flex h-full w-full flex-1 items-center justify-center gap-1">
          {filterOpen &&
            FilterButton.map((item) => (
              <button
                type="button"
                key={item.value}
                className={twMerge(
                  "rounded-full border border-grayscale-color-600 bg-white px-2 py-1 text-grayscale-color-600 text-sm shadow-sm",
                  item.value === filter
                    ? "border border-primary-color-400 bg-primary-color-400 text-white"
                    : "bg-white text-grayscale-color-600",
                )}
                onClick={handleSelectChange(item)}
              >
                {item.title}
              </button>
            ))}
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-0.5 rounded-full bg-primary-color-400 px-2 py-1 text-white shadow-sm"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          <span>필터</span>
          <FilterIcon />
        </button>
      </div>

      <div className="mx-auto grid w-full grid-cols-1 place-items-center gap-3 pt-2 pb-28 xl:grid-cols-4">
        <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
          {filteredTrips.map((item) => (
            <TripCard key={item.trip_id} trip={item} mode="list" />
          ))}
          {isFetching && (
            <div className="flex h-20 w-full items-center justify-center">
              <LoaderOnly />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default TripListMobile;
