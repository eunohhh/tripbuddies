'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import AddButtonSmall from '@/components/atoms/stories/AddButtonSmall';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useAuth } from '@/hooks';
import { useStoriesQuery } from '@/hooks/queries';
import { StoryOverlay } from '@/types/Story.types';
import groupStoriesByBuddyId from '@/utils/stories/groupStoriesByBuddyId';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

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

  const isMine = sortedStories.filter((story) => story.buddyId === buddy?.buddy_id);

  return (
    <section className="w-[92%] py-2 grid grid-cols-2 place-items-center gap-y-3 overflow-hidden xl:grid-cols-4 mx-auto xl:w-full xl:px-2">
      {isMine.length === 0 && buddy && (
        <div
          className={twMerge(
            'relative flex flex-col justify-center items-center min-w-[163px] w-[163px] h-[223px] rounded-lg gap-2 aspect-auto xl:min-w-[252px]',
            pathname === '/' && 'min-w-[139px] w-[139px] h-[190px]',
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>

          <div className="relative w-full h-14"></div>
          <div className="rounded-full relative aspect-square border-4 border-main-color h-[64px] w-[64px] z-10">
            <Image
              src={buddy?.buddy_profile_pic || '/images/test.webp'}
              alt="my-profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full object-cover"
              onClick={() => router.push(`/profile/${buddy?.buddy_id}`)}
            />
            <AddButtonSmall />
          </div>
          <div className="flex flex-col gap-[2px] text-center text-grayscale-color-70 z-10">
            <p className="text-sm">{buddy?.buddy_nickname}</p>
            <p className="text-xs">스토리 작성하기</p>
          </div>
        </div>
      )}
      {sortedStories.map((story) => (
        <StoryCard
          key={story.buddyId}
          id={story.stories[0].story_id}
          mode={buddy?.buddy_id === story.stories[0].buddies.buddy_id ? 'my' : 'story'}
          overlay={story.stories[0].story_overlay as StoryOverlay[]}
          story={story.stories[0]}
          likes={story.stories[0].likes}
        />
      ))}
    </section>
  );
};

export default StoryList;
