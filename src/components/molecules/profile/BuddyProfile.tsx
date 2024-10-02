'use client';

import EditProfileButton from '@/components/atoms/profile/EditProfileButton';
import FollowButton from '@/components/atoms/profile/FollowButton';
import { useAuth } from '@/hooks';
import { Buddy } from '@/types/Auth.types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import BlurredBuddyProfile from './BlurredBuddyProfile';
import BuddyProfileSkeleton from './BuddyProfileSkeleton';

type BuddyProfileProps = {
  clickedBuddy: Buddy | null;
  loading: boolean;
  buddy?: Buddy | null;
  urlId?: string;
  mode?: 'default' | 'notification';
  className?: string;
};

export default function BuddyProfile({
  clickedBuddy,
  loading,
  buddy = null,
  urlId = '',
  mode = 'default',
  className,
}: BuddyProfileProps) {
  const { buddy: currentBuddy } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return <BuddyProfileSkeleton />;
  }

  return (
    <div
      className={twMerge(
        'relative flex flex-col items-center justify-center p-4 mt-4 xl:mt-8',
        className,
        mode === 'notification' && 'py-1 px-4 mt-0',
      )}
    >
      <div
        className={`flex items-center gap-4 ${!currentBuddy && mode === 'default' && 'blur-sm'}`}
      >
        <div className="flex flex-col items-center">
          <Image
            src={
              clickedBuddy?.buddy_profile_pic ||
              'https://pedixhwyfardtsanotrp.supabase.co/storage/v1/object/public/buddies/profile/default_profile.webp'
            }
            alt="profile"
            width={100}
            height={100}
            className={`rounded-full ${pathname.includes('trips') ? 'w-[80px] h-[80px]' : 'w-[100px] h-[100px]'}`}
          />
          {buddy?.buddy_id === urlId &&
          // url에 'profile'이 포함되어 있으면 편집 버튼 보여주기
          pathname.includes('/profile') ? (
            <Link href={`/edit/profile/${buddy?.buddy_id}`}>
              <EditProfileButton />
            </Link>
          ) : (
            <FollowButton />
          )}
        </div>
        <div className="ml-4">
          <div className="flex flex-col ">
            <div className="flex items-center">
              <span
                className={`font-bold ${pathname.includes('/trips') ? 'text-lg' : 'text-2xl'} ${pathname.includes('/profile') ? 'xl:text-xl' : 'xl:text-3xl'}`}
              >
                {clickedBuddy?.buddy_nickname}
              </span>
              {clickedBuddy?.buddy_mbti ? (
                <span className="bg-main-color rounded-full px-3 py-1 text-sm text-white ml-2">
                  {clickedBuddy?.buddy_mbti}
                </span>
              ) : (
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 ml-2">
                  MBTI 없음
                </span>
              )}
            </div>

            {/* 나이와 성별 */}
            {clickedBuddy?.buddy_birth ? (
              <p
                className={`mt-2 text-gray-500 ${pathname.includes('/trips') ? 'text-sm' : 'text-base'}`}
              >
                {`${clickedBuddy?.buddy_birth?.split('-')[0]}
                                년생 / ${clickedBuddy?.buddy_sex}`}
              </p>
            ) : (
              <p
                className={`mt-2 text-gray-500 ${pathname.includes('/trips') ? 'text-sm' : 'text-base'}`}
              >
                생년월일 정보가 없습니다.
              </p>
            )}
            {/* 소개글 */}
            {clickedBuddy?.buddy_introduction ? (
              <p
                className={`text-gray-500 ${pathname.includes('/trips') ? 'text-sm' : 'text-base'}`}
              >
                {clickedBuddy?.buddy_introduction}
              </p>
            ) : (
              <p
                className={`text-gray-500 ${pathname.includes('/trips') ? 'text-sm' : 'text-base'}`}
              >
                소개글이 없습니다.
              </p>
            )}
            {/* 지역 */}
            {clickedBuddy?.buddy_region ? (
              <p
                className={`mt-2 text-gray-500 font-bold ${pathname.includes('/trips') ? 'text-sm' : 'text-base'}`}
              >
                {clickedBuddy?.buddy_region} 거주
              </p>
            ) : (
              <p
                className={`mt-2 text-gray-500 ${pathname.includes('/trips') ? 'text-sm' : 'text-base'}`}
              >
                지역 정보가 없습니다.
              </p>
            )}

            {/* 선호하는 버디 chips */}
            {clickedBuddy?.buddy_preferred_buddy1 ? (
              <div className="mt-4">
                <span className="bg-[#fff0d1] rounded-full px-3 py-1 text-sm font-semibold text-main-color mr-1">
                  {clickedBuddy?.buddy_preferred_buddy1}
                </span>
                <span className="bg-[#fff0d1] rounded-full px-3 py-1 text-sm font-semibold text-main-color mr-1">
                  {clickedBuddy?.buddy_preferred_buddy2}
                </span>
                <span className="bg-[#fff0d1] rounded-full px-3 py-1 text-sm font-semibold text-main-color">
                  {clickedBuddy?.buddy_preferred_buddy3}
                </span>
              </div>
            ) : (
              <div className="mt-4">
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  선호하는 버디가 없습니다.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!currentBuddy && mode === 'default' && <BlurredBuddyProfile />}
    </div>
  );
}
