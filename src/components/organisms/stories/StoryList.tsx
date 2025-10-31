"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import DefaultLoader from "@/components/atoms/common/DefaultLoader";
import AddButtonSmall from "@/components/atoms/stories/AddButtonSmall";
import StoryCard from "@/components/molecules/stories/StoryCard";
import { useAuth } from "@/hooks";
import { useStoriesQuery } from "@/hooks/queries";
import { StoryOverlay } from "@/types/Story.types";
import groupStoriesByBuddyId from "@/utils/stories/groupStoriesByBuddyId";

const StoryList: React.FC = () => {
  const { buddy } = useAuth();
  const { data: stories, isPending, error: storyError } = useStoriesQuery();
  const pathname = usePathname();
  const router = useRouter();

  const sortedStories = useMemo(() => {
    if (!stories) return [];
    const groupedStories = groupStoriesByBuddyId(stories);
    const array = Object.entries(groupedStories).map(([buddyId, stories]) => ({
      buddyId,
      stories,
    }));
    const sortedArray = array.sort((a, b) => {
      return a.buddyId === buddy?.buddy_id ? -1 : 1;
    });

    return sortedArray;
  }, [stories, buddy]);

  // 추후 변경 요망
  if (storyError) return <div>Error</div>;
  if (isPending) return <DefaultLoader />;
  if (!stories) return <div>No stories</div>;

  // console.log(sortedStories);

  const isMine = sortedStories.filter(
    (story) => story.buddyId === buddy?.buddy_id,
  );

  return (
    <section className="mx-auto grid w-[92%] grid-cols-2 place-items-center gap-y-3 overflow-hidden py-2 xl:w-full xl:grid-cols-4 xl:px-2">
      {isMine.length === 0 && buddy && (
        <div
          className={twMerge(
            "relative flex aspect-auto h-[223px] w-[163px] min-w-[163px] flex-col items-center justify-center gap-2 rounded-lg xl:min-w-[252px]",
            pathname === "/" && "h-[190px] w-[139px] min-w-[139px]",
          )}
        >
          <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-gradient-to-b from-transparent to-black/80"></div>

          <div className="relative h-14 w-full"></div>
          <div className="relative z-10 aspect-square h-[64px] w-[64px] rounded-full border-4 border-main-color">
            <Image
              src={buddy?.buddy_profile_pic || "/images/test.webp"}
              alt="my-profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full object-cover"
              onClick={() => router.push(`/profile/${buddy?.buddy_id}`)}
            />
            <AddButtonSmall />
          </div>
          <div className="z-10 flex flex-col gap-[2px] text-center text-grayscale-color-70">
            <p className="text-sm">{buddy?.buddy_nickname}</p>
            <p className="text-xs">스토리 작성하기</p>
          </div>
        </div>
      )}
      {sortedStories.map((story) => (
        <StoryCard
          key={story.buddyId}
          id={story.stories[0].story_id}
          mode={
            buddy?.buddy_id === story.stories[0].buddies.buddy_id
              ? "my"
              : "story"
          }
          overlay={story.stories[0].story_overlay as StoryOverlay[]}
          story={story.stories[0]}
          likes={story.stories[0].likes}
        />
      ))}
    </section>
  );
};

export default StoryList;
