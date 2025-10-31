import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import BuddyTemperature from "@/components/atoms/profile/BuddyTemperature";
import { Buddy } from "@/types/Auth.types";

type RankedBuddyCardProps = {
  buddy: Buddy;
  index: number;
};

const RankedBuddyCard: React.FC<RankedBuddyCardProps> = ({ buddy, index }) => {
  const router = useRouter();

  return (
    <div
      className="hover:-translate-y-2 relative transform cursor-pointer rounded-lg bg-gray-100 p-4 transition-transform duration-200"
      onClick={() => {
        router.push(`/profile/${buddy.buddy_id}`);
      }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-48 w-full">
          <Image
            src={buddy?.buddy_profile_pic || "/default-profile.png"}
            alt={buddy?.buddy_nickname}
            fill
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-2xl">{buddy?.buddy_nickname}</h3>
            <p className="text-sm">{buddy?.buddy_introduction}</p>
          </div>
          {index < 3 && (
            <div className="absolute top-4 right-4">
              <Image
                src={"/icon/medal.png"}
                alt={`${index + 1}위 메달`}
                width={40}
                height={40}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="mr-2 whitespace-nowrap font-bold text-gray-800 text-xl">
          {index + 1}위
        </span>
        <BuddyTemperature temperature={buddy?.buddy_temperature} />
      </div>
    </div>
  );
};

export default RankedBuddyCard;
