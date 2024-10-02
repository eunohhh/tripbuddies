'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import MyTripsButton from '@/components/atoms/profile/MyTripsButton';
import BuddyFollow from '@/components/molecules/profile/BuddyFollow';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useAuth } from '@/hooks';
import { useBuddyProfile } from '@/hooks/queries';
import { useFollowCountQuery } from '@/hooks/queries/buddy/useGetFollowCounts';
import { showAlert } from '@/utils/ui/openCustomAlert';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';

type ProfileProps = {
  id: string;
};

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const { buddy, logOut } = useAuth();
  const { data: clickedBuddy, isPending, error: buddyError } = useBuddyProfile(id);

  const {
    data: followList,
    isPending: followPending,
    error: followError,
  } = useFollowCountQuery(id);

  const newFollowerList = useMemo(() => {
    if (!followList || !clickedBuddy) return [];
    return followList
      .filter((data) => data.follow_following_id === clickedBuddy.buddy_id)
      .map((data) => data.follow_follower_id);
  }, [followList, clickedBuddy]);

  const newFollowingList = useMemo(() => {
    if (!followList || !clickedBuddy) return [];
    return followList
      .filter((data) => data.follow_follower_id === clickedBuddy.buddy_id)
      .map((data) => data.follow_following_id);
  }, [followList, clickedBuddy]);

  useEffect(() => {
    if (buddyError || followError) {
      const error = buddyError || followError;
      showAlert('error', error?.message || '오류가 발생했습니다.');
    }
  }, [buddyError, followError]);

  return (
    <>
      <section className="xl:flex xl:flex-row w-full h-full xl:mt-20">
        <div className="xl:w-2/5 flex flex-col items-center justify-center w-full h-full">
          <BuddyProfile
            clickedBuddy={clickedBuddy || null}
            loading={isPending}
            buddy={buddy}
            urlId={`${id}`}
          />
        </div>

        {/* TODO: 팔로잉, 팔로워 깜빡임 제거 : 로딩 스켈레톤 또는 프리페칭 처리 */}
        <div className="xl:w-3/5 w-full h-full flex flex-col justify-between">
          <section className="w-full h-full flex justify-center items-center my-4">
            <div className="flex flex-row items-center mx-4 space-x-4 w-full">
              <span className="flex-1">
                <Link href={`/profile/follow/${id}?view=following`}>
                  <BuddyFollow id={id} type="팔로잉" count={newFollowingList.length} />
                </Link>
              </span>
              <span className="border-l border-gray-300 h-10 mx-2" />
              <span className="flex-1">
                <Link href={`/profile/follow/${id}?view=follower`}>
                  <BuddyFollow id={id} type="팔로워" count={newFollowerList.length} />
                </Link>
              </span>
            </div>
            <div className="flex flex-col items-center mr-8 w-full">
              <span className="w-full">
                <BuddyTemperature temperature={clickedBuddy?.buddy_temperature || 0} />
              </span>
            </div>
          </section>

          <section className="mt-16 mx-8 bg-gray-100">
            <div className="flex flex-col">
              {['created', 'bookmarked', 'participated'].map((view) => (
                <MyTripsButton
                  key={view}
                  view={view as 'created' | 'bookmarked' | 'participated'}
                  src={`/svg/Mytrips_${view}.svg`}
                  alt={`내가 ${
                    view === 'created' ? '만든' : view === 'bookmarked' ? '찜한' : '참여한'
                  } 여정`}
                  id={id}
                />
              ))}
            </div>
          </section>

          {buddy?.buddy_id === clickedBuddy?.buddy_id && (
            <section className="mt-16 mx-8">
              <button
                className="bg-main-color text-white font-bold h-10 w-full rounded-xl"
                onClick={logOut}
              >
                로그아웃
              </button>
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
