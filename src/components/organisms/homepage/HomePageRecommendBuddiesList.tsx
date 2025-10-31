"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import MascotImage from "@/components/atoms/common/MascotImage";
import BuddyTemperature from "@/components/atoms/profile/BuddyTemperature";
import { useAuth } from "@/hooks";
import { Buddy } from "@/types/Auth.types";
import { getAgeFromBirthDate } from "@/utils/common/getAgeFromBirthDate";
import FollowHeartButton from "../profile/FollowHeartButton";

function HomePageRecommendBuddiesList({
  buddies,
  className,
}: {
  buddies: Buddy[];
  className?: string;
}) {
  const { buddy: currentBuddy } = useAuth();
  const router = useRouter();

  const handleCardClick = (buddyId: string) => {
    router.push(`/profile/${buddyId}`);
  };

  return (
    <>
      {buddies
        ? buddies.map((buddy: Buddy, index: number) => (
            <div
              key={index}
              className={twMerge(
                "relative mx-1 flex h-[89px] cursor-pointer items-center rounded-[8px] border border-gray-200 px-2",
                className,
              )}
              onClick={() => handleCardClick(buddy.buddy_id)}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="flex h-[75px] w-[75px] flex-shrink-0 items-center justify-center">
                  {buddy.buddy_profile_pic ? (
                    <Image
                      src={buddy.buddy_profile_pic}
                      alt="profile"
                      width={60}
                      height={60}
                      className="h-[60px] w-[60px] rounded-lg object-cover"
                    />
                  ) : (
                    <MascotImage intent="happy" />
                  )}
                </div>
                <div className="relative mx-1 flex w-full flex-col">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-500 text-xs">
                    {buddy.buddy_preferred_buddy1 &&
                    buddy.buddy_preferred_buddy2
                      ? `#${buddy.buddy_preferred_buddy1} #${buddy.buddy_preferred_buddy2}`
                      : "#태그없음"}
                  </span>
                  <div className="w-full max-w-[152px] overflow-hidden text-ellipsis whitespace-nowrap font-bold text-m">
                    <span className="block truncate">
                      {buddy.buddy_nickname}
                      {typeof buddy.buddy_birth === "string"
                        ? ` / ${getAgeFromBirthDate(buddy.buddy_birth)}세`
                        : null}
                    </span>
                  </div>

                  <div className="flex w-full items-center justify-between">
                    <BuddyTemperature
                      isLabel={false}
                      isTempText={false}
                      temperature={buddy.buddy_temperature}
                    />
                  </div>
                </div>
              </div>

              <FollowHeartButton
                followingId={buddy.buddy_id}
                followerId={currentBuddy?.buddy_id || ""}
                onClick={(e) => e.stopPropagation()} // 하트 버튼 이벤트 버블링 막기
              />
            </div>
          ))
        : null}
    </>
  );
}

export default HomePageRecommendBuddiesList;
