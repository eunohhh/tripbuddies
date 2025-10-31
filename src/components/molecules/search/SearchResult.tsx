"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useRef } from "react";
import MascotImage from "@/components/atoms/common/MascotImage";
import { useTapScroll } from "@/hooks";
import type { TripWithContract } from "@/types/Trips.types";
import SearchPageTitle from "../../atoms/search/SearchPageTitle";
import HomePageTrips from "../homepage/HomePageTrips";

type SearchResultProps = {
  items: TripWithContract[];
  allTrips: TripWithContract[];
  visibleFirstItems: number;
  visibleSecondItems: number;
  loadMoreFirstItems: () => void;
  loadMoreSecondItems: () => void;
  isXL: boolean;
};

const SearchResult: React.FC<SearchResultProps> = ({
  items,
  allTrips,
  visibleFirstItems,
  visibleSecondItems,
  loadMoreFirstItems,
  loadMoreSecondItems,
  isXL,
}) => {
  const router = useRouter();
  const tripsRef = useRef<HTMLDivElement>(null);
  useTapScroll({ refs: [tripsRef] });

  const filteredItems = isXL ? items.slice(0, visibleFirstItems) : items;

  // 시작 날짜 기준으로 빠른 순으로 정렬
  // 검색 결과 여정은 제외
  const sortItems = [...allTrips]
    .filter((item) => !filteredItems.includes(item))
    .sort((a, b) => {
      return (
        new Date(a.trip_start_date).getTime() -
        new Date(b.trip_start_date).getTime()
      );
    });

  // console.log('filteredItems 결과 ====>', filteredItems);

  return (
    <>
      <section className="my-10 mt-20">
        {filteredItems.length === 0 ? (
          <div className="mx-auto flex flex-col items-center justify-center">
            <div className="relative mb-10 h-[100px] w-[100px]">
              <Image
                src={"/images/mascot_sad.webp"}
                alt="profile"
                width={100}
                height={100}
                className="h-[100px] w-[100px] object-contain"
              />
            </div>
            <p className="mx-auto flex items-center justify-center">
              아쉽게도 일치하는 여정 결과가 없어요
            </p>
          </div>
        ) : isXL ? (
          <div className="mt-8 grid grid-cols-1 gap-1 xl:w-full xl:grid-cols-4 xl:gap-5">
            <HomePageTrips trips={filteredItems} />
          </div>
        ) : (
          <div
            className="scrollbar-hidden flex gap-[10px] overflow-x-scroll"
            ref={tripsRef}
          >
            <HomePageTrips trips={filteredItems} />
          </div>
        )}

        {visibleFirstItems < filteredItems.length && (
          <button
            type="button"
            className="mx-auto mt-4 hidden rounded-2xl bg-main-color px-4 py-2 text-sm text-white xl:block"
            onClick={loadMoreFirstItems}
          >
            더보기
          </button>
        )}
      </section>

      {sortItems.length > 0 && (
        <section className="mt-16 xl:mt-24">
          <SearchPageTitle
            title="여행자님, 이런 여정은 어떠세요?"
            description="모집 마감이 얼마 남지 않은 여정들이에요"
          />

          <ul className="mt-8 grid grid-cols-1 gap-1 xl:w-full xl:grid-cols-3 xl:gap-2">
            {sortItems.slice(0, visibleSecondItems).map((item, index) => (
              <li
                key={index}
                className="mx-auto mb-6 h-[93px] w-[335px] rounded-[11px] p-3 shadow-md xl:mx-0 xl:h-[120px] xl:w-full"
                onClick={() => {
                  router.push(`/trips/${item.trip_id}`);
                }}
              >
                <div className="flex h-full cursor-pointer items-center">
                  <div className="h-[60px] w-[60px] rounded-lg bg-grayscale-color-85">
                    {item.trip_thumbnail ? (
                      <Image
                        src={item.trip_thumbnail}
                        alt={item.trip_title || "Thumnail"}
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px] rounded-lg object-cover"
                      />
                    ) : (
                      <MascotImage intent="happy" />
                    )}
                  </div>
                  <div className="ml-8 flex w-[218px] flex-col justify-between">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-500 text-xs">
                      {item.trip_theme1 && item.trip_theme2 && item.trip_theme3
                        ? `#${item.trip_theme1} #${item.trip_theme2} #${item.trip_theme3}`
                        : "#태그없음"}
                    </span>
                    <p className="mt-1 mb-2.5 truncate font-semibold">
                      {item.trip_title}
                    </p>
                    <div className="mb-1 flex w-full items-center justify-between">
                      <p className="max-w-[calc(100%-70px)] truncate">
                        {item.trip_content}
                      </p>
                      <span>{`${item.trip_max_buddies_counts}/4`}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {visibleSecondItems < sortItems.length && (
            <button
              type="button"
              className="mx-auto mt-4 block rounded-2xl bg-main-color px-4 py-2 text-sm text-white"
              onClick={loadMoreSecondItems}
            >
              더보기
            </button>
          )}
        </section>
      )}
    </>
  );
};

export default SearchResult;
