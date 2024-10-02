'use client';
import { useTapScroll } from '@/hooks';
import { StoryFilter } from '@/types/Story.types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface StoryFilterImageProps {
  handleStep: (step: number) => void;
  selectedMedia: string;
  filterImage: StoryFilter[];
  selectedFilter: StoryFilter;
  handleFilter: (filter: StoryFilter) => void;
}

const StoryFilterImage: React.FC<StoryFilterImageProps> = ({
  handleStep,
  selectedMedia,
  filterImage,
  selectedFilter,
  handleFilter,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useTapScroll({ refs: [filterRef] });

  return (
    <section className="relative flex flex-col w-full h-[calc(100dvh-57px-54px)] max-h-dvh overflow-hidden aspect-auto bg-gradient-to-b from-transparent to-black/20 xl:h-[calc(100dvh-100px)]">
      <div className="absolute flex justify-end w-full top-0 right-0 z-10 gap-2">
        <button
          className=" bg-main-color text-white px-2 py-1 rounded-md leading-none shadow-md"
          onClick={() => handleStep(0)}
        >
          이전
        </button>
        <button
          className=" bg-main-color text-white px-2 py-1 rounded-md top-0 leading-none shadow-md"
          onClick={() => handleStep(2)}
        >
          다음
        </button>
      </div>

      <div
        className={clsx(
          'relative w-full h-[80%] aspect-auto',
          selectedFilter && selectedFilter.className,
        )}
      >
        <Image
          src={selectedMedia}
          alt="my-story-background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={() => setIsLoaded(true)}
          className={clsx('object-contain', isLoaded ? 'opacity-100' : 'opacity-0')}
        />
      </div>

      <div
        className="relative flex flex-row bottom-0 overflow-x-scroll scrollbar-hidden gap-2 pt-1 pb-2 h-[20%]"
        ref={filterRef}
      >
        {filterImage.map((filter) => (
          <div
            className="flex flex-col justify-center items-center relative min-w-[90px] h-full gap-1"
            key={filter.name}
          >
            <p className="text-sm text-black h-[10%] leading-none">{filter.name}</p>
            <button
              className={twMerge(
                'w-[100%] h-[90%] aspect-auto',
                filter.className && filter.className,
              )}
              onClick={() => handleFilter(filter)}
            >
              <Image
                src={selectedMedia}
                alt={filter.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="relative object-cover w-full h-full rounded-2xl"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryFilterImage;
