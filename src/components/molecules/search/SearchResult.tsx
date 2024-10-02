'use client';
import MascotImage from '@/components/atoms/common/MascotImage';
import { useTapScroll } from '@/hooks';
import { TripWithContract } from '@/types/Trips.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import SearchPageTitle from '../../atoms/search/SearchPageTitle';
import HomePageTrips from '../homepage/HomePageTrips';

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
      return new Date(a.trip_start_date).getTime() - new Date(b.trip_start_date).getTime();
    });

  // console.log('filteredItems 결과 ====>', filteredItems);

  return (
    <>
      <section className="my-10 mt-20">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center mx-auto">
            <div className="relative w-[100px] h-[100px] mb-10">
              <Image
                src={'/images/mascot_sad.webp'}
                alt="profile"
                width={100}
                height={100}
                className="object-contain h-[100px] w-[100px]"
              />
            </div>
            <p className="flex justify-center items-center mx-auto">
              아쉽게도 일치하는 여정 결과가 없어요
            </p>
          </div>
        ) : isXL ? (
          <div className="grid grid-cols-1 gap-1 mt-8 xl:grid-cols-4 xl:gap-5 xl:w-full">
            <HomePageTrips trips={filteredItems} />
          </div>
        ) : (
          <div className="overflow-x-scroll scrollbar-hidden flex gap-[10px]" ref={tripsRef}>
            <HomePageTrips trips={filteredItems} />
          </div>
        )}

        {visibleFirstItems < filteredItems.length && (
          <button
            className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto hidden xl:block"
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

          <ul className="grid grid-cols-1 gap-1 mt-8 xl:grid-cols-3 xl:gap-2 xl:w-full">
            {sortItems.slice(0, visibleSecondItems).map((item, index) => (
              <li
                key={index}
                className="shadow-md w-[335px] h-[93px] rounded-[11px] mx-auto mb-6 xl:mx-0 xl:w-full xl:h-[120px] p-3"
                onClick={() => {
                  router.push(`/trips/${item.trip_id}`);
                }}
              >
                <div className="cursor-pointer flex items-center h-full">
                  <div className="bg-grayscale-color-85 rounded-lg w-[60px] h-[60px]">
                    {item.trip_thumbnail ? (
                      <Image
                        src={item.trip_thumbnail}
                        alt={item.trip_title || 'Thumnail'}
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px] rounded-lg object-cover"
                      />
                    ) : (
                      <MascotImage intent="happy" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between w-[218px] ml-8">
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.trip_theme1 && item.trip_theme2 && item.trip_theme3
                        ? `#${item.trip_theme1} #${item.trip_theme2} #${item.trip_theme3}`
                        : '#태그없음'}
                    </span>
                    <p className="font-semibold truncate mt-1 mb-2.5">{item.trip_title}</p>
                    <div className="flex items-center justify-between w-full mb-1">
                      <p className="truncate max-w-[calc(100%-70px)]">{item.trip_content}</p>
                      <span>{`${item.trip_max_buddies_counts}/4`}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {visibleSecondItems < sortItems.length && (
            <button
              className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto block"
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
