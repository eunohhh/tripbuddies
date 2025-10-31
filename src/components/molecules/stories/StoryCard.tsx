"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import AddButtonSmall from "@/components/atoms/stories/AddButtonSmall";
import LikesButton from "@/components/atoms/stories/LikesButton";
import {
  StoryLikes,
  StoryOverlay,
  StoryWithBuddies,
} from "@/types/Story.types";
import { getTimeSinceUpload } from "@/utils/common/getTimeSinceUpload";

type StoryCardProps = {
  mode: "my" | "story";
  id: string;
  story: StoryWithBuddies;
  overlay: StoryOverlay[];
  likes: StoryLikes[];
  isMain?: boolean;
};

const StoryCard: React.FC<StoryCardProps> = ({
  mode,
  id,
  story,
  overlay,
  likes,
  isMain = false,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "relative flex aspect-auto h-[223px] w-[163px] min-w-[163px] flex-col items-center justify-center gap-2 rounded-lg xl:min-w-[252px]",
        pathname === "/" && "h-[190px] w-[139px] min-w-[139px]",
      )}
    >
      {!isMain && (
        <div className="absolute top-0.5 right-1 z-[99] flex w-full flex-row justify-end">
          <button type="button" className="relative focus:outline-none">
            <LikesButton
              storyId={story.story_id}
              likesCount={story.story_likes_counts}
              mode="card"
              likes={likes}
            />
          </button>
        </div>
      )}
      <Link
        className="absolute flex aspect-auto h-full w-full items-center justify-center"
        href={`/stories/${id}`}
      >
        <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-gradient-to-b from-transparent to-black/80"></div>

        <Image
          src={story.story_media}
          alt="story-background"
          fill
          priority
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={twMerge(
            "rounded-lg object-cover",
            overlay[0].filter?.className,
          )}
        />
      </Link>

      <div className="relative h-14 w-full"></div>
      <div className="relative z-10 aspect-square h-[64px] w-[64px] rounded-full border-4 border-main-color">
        <Image
          src={story.buddies.buddy_profile_pic || "/images/test.webp"}
          alt="my-profile"
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full object-cover"
          onClick={() => router.push(`/profile/${story.buddies.buddy_id}`)}
        />
        {mode === "my" && <AddButtonSmall />}
      </div>

      <div className="z-10 flex flex-col gap-[2px] text-center text-grayscale-color-70">
        <p className="text-sm">{story.buddies.buddy_nickname}</p>
        <p className="text-xs">
          {mode === "my"
            ? "내 스토리"
            : getTimeSinceUpload(story.story_created_at)}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
