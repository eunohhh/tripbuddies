import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MascotImage from "@/components/atoms/common/MascotImage";
import BuddyTemperature from "@/components/atoms/profile/BuddyTemperature";
import FollowHeartButton from "@/components/organisms/profile/FollowHeartButton";
import { useAuth } from "@/hooks";
import { Buddy } from "@/types/Auth.types";
import { getAgeFromBirthDate } from "@/utils/common/getAgeFromBirthDate";

interface BuddyCardProps {
  followList: string[];
  activeButton: string;
}

const BuddyCardSkeleton: React.FC = () => {
  return (
    <div className="mx-1 mb-4 flex h-[75px] min-w-[200px] animate-pulse items-center rounded-lg p-2 shadow-md xl:mx-auto xl:w-[335px]">
      <div className="h-[65px] w-[65px] flex-shrink-0 rounded-lg bg-gray-300"></div>
      <div className="mx-1 flex w-full flex-col">
        <div className="mb-2 h-4 w-1/3 rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-3 w-4/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

function BuddyCard({ followList, activeButton }: BuddyCardProps) {
  const { buddy: currentBuddy } = useAuth();
  const router = useRouter();
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        setIsLoading(true);
        const fetchedBuddies = await Promise.all(
          followList.map(async (id) => {
            try {
              const response = await fetch(`/api/buddyProfile/buddy?id=${id}`);
              if (!response.ok) {
                throw new Error("버디 정보를 불러오는 데 실패했습니다.");
              }
              return response.json();
            } catch (error) {
              console.error("에러가 발생했습니다.:", error);
              return null;
            }
          }),
        );
        setBuddies(fetchedBuddies.filter((buddy) => buddy !== null));
      } catch (error) {
        console.error("에러가 발생했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuddies();
  }, [followList]);

  const handleCardClick = (buddyId: string) => {
    router.push(`/profile/${buddyId}`);
  };

  return (
    <>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <BuddyCardSkeleton key={index} />
        ))
      ) : buddies.length === 0 ? (
        <div className="mx-auto mt-10 flex flex-col items-center justify-center">
          <Image
            src="/images/mascot_sad.webp"
            alt="sad mascot image"
            width={300}
            height={300}
          />
          <div className="mt-10 text-center font-bold text-3xl text-gray-500">
            {activeButton === "팔로잉"
              ? "이런, 팔로잉하는 버디가 없군요!"
              : "이런, 회원님을 팔로우 하는 버디가 없군요!"}
          </div>
        </div>
      ) : (
        buddies.map((buddy: Buddy, index: number) => (
          <div
            key={index}
            className="relative mx-1 mb-4 flex h-[75px] cursor-pointer items-center rounded-lg px-2 shadow-md xl:mx-auto xl:w-[335px]"
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
                    className="h-[60px] w-[60px] rounded-lg"
                  />
                ) : (
                  <MascotImage intent="happy" />
                )}
              </div>
              <div className="relative mx-1 flex w-full flex-col">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-500 text-xs">
                  {buddy.buddy_preferred_buddy1 && buddy.buddy_preferred_buddy2
                    ? `#${buddy.buddy_preferred_buddy1} #${buddy.buddy_preferred_buddy2}`
                    : "#태그없음"}
                </span>
                <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-m">
                  <span className="block truncate">
                    {buddy.buddy_nickname}
                    {typeof buddy.buddy_birth === "string"
                      ? ` / ${getAgeFromBirthDate(buddy.buddy_birth)} 세`
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
      )}
    </>
  );
}

export default BuddyCard;
