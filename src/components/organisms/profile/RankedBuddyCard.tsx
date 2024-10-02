import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import { Buddy } from '@/types/Auth.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type RankedBuddyCardProps = {
  buddy: Buddy;
  index: number;
};

const RankedBuddyCard: React.FC<RankedBuddyCardProps> = ({ buddy, index }) => {
  const router = useRouter();

  return (
    <div
      className="bg-gray-100 rounded-lg p-4 relative transform transition-transform duration-200 hover:-translate-y-2 cursor-pointer"
      onClick={() => {
        router.push(`/profile/${buddy.buddy_id}`);
      }}
    >
      <div className="relative rounded-lg overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={buddy?.buddy_profile_pic || '/default-profile.png'}
            alt={buddy?.buddy_nickname}
            fill
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-2xl font-bold">{buddy?.buddy_nickname}</h3>
            <p className="text-sm">{buddy?.buddy_introduction}</p>
          </div>
          {index < 3 && (
            <div className="absolute top-4 right-4">
              <Image src={'/icon/medal.png'} alt={`${index + 1}위 메달`} width={40} height={40} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-800 whitespace-nowrap mr-2">
          {index + 1}위
        </span>
        <BuddyTemperature temperature={buddy?.buddy_temperature} />
      </div>
    </div>
  );
};

export default RankedBuddyCard;
