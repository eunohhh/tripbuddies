'use client';

import AddButtonSmall from '@/components/atoms/stories/AddButtonSmall';
import LikesButton from '@/components/atoms/stories/LikesButton';
import { StoryLikes, StoryOverlay, StoryWithBuddies } from '@/types/Story.types';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type StoryCardProps = {
  mode: 'my' | 'story';
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
        'relative flex flex-col justify-center items-center min-w-[163px] w-[163px] h-[223px] rounded-lg gap-2 aspect-auto xl:min-w-[252px]',
        pathname === '/' && 'min-w-[139px] w-[139px] h-[190px]',
      )}
    >
      {!isMain && (
        <div className="absolute top-0.5 right-1 w-full flex flex-row justify-end z-[99]">
          <button className="relative focus:outline-none">
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
        className="w-full h-full absolute aspect-auto flex justify-center items-center"
        href={`/stories/${id}`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>

        <Image
          src={story.story_media}
          alt="my-profile-background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={twMerge(
            'object-cover rounded-lg',
            overlay[0].filter && overlay[0].filter.className,
          )}
        />
      </Link>

      <div className="relative w-full h-14"></div>
      <div className="rounded-full relative aspect-square border-4 border-main-color h-[64px] w-[64px] z-10">
        <Image
          src={story.buddies.buddy_profile_pic || '/images/test.webp'}
          alt="my-profile"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full object-cover"
          onClick={() => router.push(`/profile/${story.buddies.buddy_id}`)}
        />
        {mode === 'my' && <AddButtonSmall />}
      </div>

      <div className="flex flex-col gap-[2px] text-center text-grayscale-color-70 z-10">
        <p className="text-sm">{story.buddies.buddy_nickname}</p>
        <p className="text-xs">
          {mode === 'my' ? '내 스토리' : getTimeSinceUpload(story.story_created_at)}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
