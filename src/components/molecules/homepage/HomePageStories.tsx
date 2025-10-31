"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import AddButtonSmall from "@/components/atoms/stories/AddButtonSmall";
import { Buddy } from "@/types/Auth.types";
import { StoryOverlay, StoryWithBuddiesAndLikes } from "@/types/Story.types";
import groupStoriesByBuddyId from "@/utils/stories/groupStoriesByBuddyId";
import StoryCard from "../stories/StoryCard";

type HomePageStoriesProps = {
  stories: StoryWithBuddiesAndLikes[];
  buddy: Buddy | null;
};

const HomePageStories: React.FC<HomePageStoriesProps> = ({
  stories,
  buddy,
}: HomePageStoriesProps) => {
  const pathname = usePathname();
  const router = useRouter();
  // stories에서 buddies.buddy_id 값이 같은 것들만 배열로 묶은 객체 생성
  const sortedStories = useMemo(() => {
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

  // console.log(sortedStories);

  // 0번 인덱스만 전달하는 이유는 스토리 최신 것만 앞에 보여주기 위함임
  const isMine = sortedStories.filter(
    (story) => story.buddyId === buddy?.buddy_id,
  );

  return (
    <>
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
          isMain={true}
        />
      ))}
    </>
  );
};

export default HomePageStories;
