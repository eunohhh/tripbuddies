'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import FollowList from '@/components/molecules/profile/followList/FollowList';
import { useFollowCountQuery } from '@/hooks/queries';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function FollowListPage() {
  const router = useRouter();
  const { id: clickedBuddyId } = useParams<{ id: string }>();
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [followerList, setFollowerList] = useState<string[]>([]);

  const [activeButton, setActiveButton] = useState<'팔로잉' | '팔로워'>('팔로워');
  const searchParams = useSearchParams();

  const { data: followList, isLoading } = useFollowCountQuery(clickedBuddyId);

  useEffect(() => {
    if (!followList) return;

    const newFollowerList = followList
      .filter((data) => data.follow_following_id === clickedBuddyId)
      .map((data) => data.follow_follower_id);

    const newFollowingList = followList
      .filter((data) => data.follow_follower_id === clickedBuddyId)
      .map((data) => data.follow_following_id);

    setFollowingList(newFollowingList);
    setFollowerList(newFollowerList);
  }, [followList, clickedBuddyId]);

  // console.log('followingList', followingList);
  // console.log('followerList', followerList);

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'follower') {
      setActiveButton('팔로워');
    } else if (view === 'following') {
      setActiveButton('팔로잉');
      router.push(`/profile/follow/${clickedBuddyId}?view=following`);
    }
  }, [searchParams, router, clickedBuddyId]);

  useEffect(() => {
    if (activeButton === '팔로워') {
      router.push(`/profile/follow/${clickedBuddyId}?view=follower`);
    } else if (activeButton === '팔로잉') {
      router.push(`/profile/follow/${clickedBuddyId}?view=following`);
    }
  }, [activeButton, clickedBuddyId, router]);

  if (isLoading) {
    return <DefaultLoader />;
  }

  return (
    <>
      <div className="flex justify-center mb-4 w-[335px] mx-auto">
        <div className="w-full mb-4">
          <button
            className={twMerge(
              'text-[18px] font-bold px-4 py-2 w-1/2',
              activeButton === '팔로워' && 'border-b-3 border-main-color text-main-color',
            )}
            onClick={() => setActiveButton('팔로워')}
          >
            팔로워
          </button>
          <button
            className={twMerge(
              'text-[18px] font-bold px-4 py-2 w-1/2',
              activeButton === '팔로잉' && 'border-b-3 border-main-color text-main-color',
            )}
            onClick={() => setActiveButton('팔로잉')}
          >
            팔로잉
          </button>
        </div>
      </div>
      {activeButton === '팔로워' && (
        <FollowList followList={followingList} activeButton={activeButton} />
      )}
      {activeButton === '팔로잉' && (
        <FollowList followList={followerList} activeButton={activeButton} />
      )}
    </>
  );
}

export default FollowListPage;
