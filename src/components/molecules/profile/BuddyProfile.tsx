"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import EditProfileButton from "@/components/atoms/profile/EditProfileButton";
import FollowButton from "@/components/atoms/profile/FollowButton";
import { useAuth } from "@/hooks";
import { Buddy } from "@/types/Auth.types";
import BlurredBuddyProfile from "./BlurredBuddyProfile";
import BuddyProfileSkeleton from "./BuddyProfileSkeleton";

type BuddyProfileProps = {
  clickedBuddy: Buddy | null;
  loading: boolean;
  buddy?: Buddy | null;
  urlId?: string;
  mode?: "default" | "notification";
  className?: string;
};

export default function BuddyProfile({
  clickedBuddy,
  loading,
  buddy = null,
  urlId = "",
  mode = "default",
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
        "relative mt-4 flex flex-col items-center justify-center p-4 xl:mt-8",
        className,
        mode === "notification" && "mt-0 px-4 py-1",
      )}
    >
      <div
        className={`flex items-center gap-4 ${!currentBuddy && mode === "default" && "blur-sm"}`}
      >
        <div className="flex flex-col items-center">
          <Image
            src={
              clickedBuddy?.buddy_profile_pic ||
              "https://pedixhwyfardtsanotrp.supabase.co/storage/v1/object/public/buddies/profile/default_profile.webp"
            }
            alt="profile"
            width={100}
            height={100}
            className={`rounded-full ${pathname.includes("trips") ? "h-[80px] w-[80px]" : "h-[100px] w-[100px]"}`}
          />
          {buddy?.buddy_id === urlId &&
          // url에 'profile'이 포함되어 있으면 편집 버튼 보여주기
          pathname.includes("/profile") ? (
            <Link href={`/edit/profile/${buddy?.buddy_id}`}>
              <EditProfileButton />
            </Link>
          ) : (
            <FollowButton />
          )}
        </div>
        <div className="ml-4">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span
                className={`font-bold ${pathname.includes("/trips") ? "text-lg" : "text-2xl"} ${pathname.includes("/profile") ? "xl:text-xl" : "xl:text-3xl"}`}
              >
                {clickedBuddy?.buddy_nickname}
              </span>
              {clickedBuddy?.buddy_mbti ? (
                <span className="ml-2 rounded-full bg-main-color px-3 py-1 text-sm text-white">
                  {clickedBuddy?.buddy_mbti}
                </span>
              ) : (
                <span className="ml-2 rounded-full bg-gray-200 px-3 py-1 text-gray-700 text-sm">
                  MBTI 없음
                </span>
              )}
            </div>

            {/* 나이와 성별 */}
            {clickedBuddy?.buddy_birth ? (
              <p
                className={`mt-2 text-gray-500 ${pathname.includes("/trips") ? "text-sm" : "text-base"}`}
              >
                {`${clickedBuddy?.buddy_birth?.split("-")[0]}
                                년생 / ${clickedBuddy?.buddy_sex}`}
              </p>
            ) : (
              <p
                className={`mt-2 text-gray-500 ${pathname.includes("/trips") ? "text-sm" : "text-base"}`}
              >
                생년월일 정보가 없습니다.
              </p>
            )}
            {/* 소개글 */}
            {clickedBuddy?.buddy_introduction ? (
              <p
                className={`text-gray-500 ${pathname.includes("/trips") ? "text-sm" : "text-base"}`}
              >
                {clickedBuddy?.buddy_introduction}
              </p>
            ) : (
              <p
                className={`text-gray-500 ${pathname.includes("/trips") ? "text-sm" : "text-base"}`}
              >
                소개글이 없습니다.
              </p>
            )}
            {/* 지역 */}
            {clickedBuddy?.buddy_region ? (
              <p
                className={`mt-2 font-bold text-gray-500 ${pathname.includes("/trips") ? "text-sm" : "text-base"}`}
              >
                {clickedBuddy?.buddy_region} 거주
              </p>
            ) : (
              <p
                className={`mt-2 text-gray-500 ${pathname.includes("/trips") ? "text-sm" : "text-base"}`}
              >
                지역 정보가 없습니다.
              </p>
            )}

            {/* 선호하는 버디 chips */}
            {clickedBuddy?.buddy_preferred_buddy1 ? (
              <div className="mt-4">
                <span className="mr-1 rounded-full bg-[#fff0d1] px-3 py-1 font-semibold text-main-color text-sm">
                  {clickedBuddy?.buddy_preferred_buddy1}
                </span>
                <span className="mr-1 rounded-full bg-[#fff0d1] px-3 py-1 font-semibold text-main-color text-sm">
                  {clickedBuddy?.buddy_preferred_buddy2}
                </span>
                <span className="rounded-full bg-[#fff0d1] px-3 py-1 font-semibold text-main-color text-sm">
                  {clickedBuddy?.buddy_preferred_buddy3}
                </span>
              </div>
            ) : (
              <div className="mt-4">
                <span className="rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-700 text-sm">
                  선호하는 버디가 없습니다.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!currentBuddy && mode === "default" && <BlurredBuddyProfile />}
    </div>
  );
}
