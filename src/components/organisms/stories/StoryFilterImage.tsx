"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTapScroll } from "@/hooks";
import { StoryFilter } from "@/types/Story.types";

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
    <section className="relative flex aspect-auto h-[calc(100dvh-57px-54px)] max-h-dvh w-full flex-col overflow-hidden bg-gradient-to-b from-transparent to-black/20 xl:h-[calc(100dvh-100px)]">
      <div className="absolute top-0 right-0 z-10 flex w-full justify-end gap-2">
        <button
          type="button"
          className="rounded-md bg-main-color px-2 py-1 text-white leading-none shadow-md"
          onClick={() => handleStep(0)}
        >
          이전
        </button>
        <button
          type="button"
          className="top-0 rounded-md bg-main-color px-2 py-1 text-white leading-none shadow-md"
          onClick={() => handleStep(2)}
        >
          다음
        </button>
      </div>

      <div
        className={clsx(
          "relative aspect-auto h-[80%] w-full",
          selectedFilter?.className,
        )}
      >
        <Image
          src={selectedMedia}
          alt="my-story-background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={() => setIsLoaded(true)}
          className={clsx(
            "object-contain",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <div
        className="scrollbar-hidden relative bottom-0 flex h-[20%] flex-row gap-2 overflow-x-scroll pt-1 pb-2"
        ref={filterRef}
      >
        {filterImage.map((filter) => (
          <div
            className="relative flex h-full min-w-[90px] flex-col items-center justify-center gap-1"
            key={filter.name}
          >
            <p className="h-[10%] text-black text-sm leading-none">
              {filter.name}
            </p>
            <button
              type="button"
              className={twMerge(
                "aspect-auto h-[90%] w-[100%]",
                filter.className && filter.className,
              )}
              onClick={() => handleFilter(filter)}
            >
              <Image
                src={selectedMedia}
                alt={filter.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="relative h-full w-full rounded-2xl object-cover"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryFilterImage;
