'use client';

import { useAuth } from '@/hooks';
import { useContractQuery } from '@/hooks/queries';
import getDaysLeft from '@/utils/common/getDaysLeft';
import filterOldTrips from '@/utils/trips/filterOldTrips';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const HomePageBanner = () => {
  const { buddy } = useAuth();
  const [randomImgSrc, setRandomImgSrc] = useState<string>('');

  const { data, isPending, error } = useContractQuery({
    isBuddy: true,
    id: buddy?.buddy_id,
  });

  // console.log('data =====>', data);

  useEffect(() => {
    const bannerImgs = [
      'test_city.jpg',
      'test_city2.jpg',
      'test_banner1.webp',
      'test_banner2.webp',
      'test_banner3.webp',
    ];
    const randomImg = bannerImgs[Math.floor(Math.random() * bannerImgs.length)];
    setRandomImgSrc(`/images/${randomImg}`);
  }, []);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const upcomingTrips = useMemo(() => {
    if (!data) return [];
    return filterOldTrips(data.trips);
  }, [data]);

  return (
    <div className="relative h-[200px] z-0">
      <div className="relative text-left font-semibold text-2xl px-4 py-8 h-[230px] flex flex-col justify-end aspect-auto z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        {randomImgSrc && (
          <Image
            src={randomImgSrc}
            alt="banner"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 33vw"
            className="object-cover relative z-0"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 text-white h-full flex flex-col justify-center gap-3">
          {upcomingTrips.length > 0 && (
            <Link href={`trips/${upcomingTrips[0].trip_id}`}>
              <p>
                <span className="font-bold text-3xl">{buddy?.buddy_nickname}</span>
                님,
              </p>
              <p>{`예정된 ${upcomingTrips[0].trip_final_destination} 여행이`}</p>
              <p>
                <span className="font-bold text-3xl">
                  {getDaysLeft(upcomingTrips[0].trip_start_date)}
                </span>
                일 남았어요!
              </p>
            </Link>
          )}
          {!data?.trips.length && buddy && !isPending && (
            <>
              <p>
                <span className="font-bold text-3xl">{buddy?.buddy_nickname}</span>
                님,
              </p>
              <p>아직 여행 일정이 없군요!</p>
            </>
          )}

          {!buddy && (
            <>
              <p className="text-2xl">트립버디즈와</p>
              <p className="font-bold text-3xl">즐거운 여정을</p>
              <p className="text-2xl">시작해보세요!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageBanner;
