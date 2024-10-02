import MascotImage from '@/components/atoms/common/MascotImage';
import WelcomeMessage from '@/components/molecules/write/WelcomeMessage';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type WelcomePageProps = {
  SelectBuddyCounts: React.FC;
  isMini?: boolean;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ SelectBuddyCounts, isMini }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <WelcomeMessage />
      <div
        className={twMerge(
          'flex justify-center h-[50%] w-[300px] xl:h-[300px] xl:w-[300px] mx-auto',
          isMini && 'h-[180px] w-[200px]',
        )}
      >
        <MascotImage intent="main" className="w-[70%] h-[70%]" />
      </div>
      <div className="flex h-[10%] text-2xl xl:mt-1 xl:mb-1 justify-center items-center">
        여정 인원을 선택해주세요
      </div>
      <div className="flex h-[3%] flex-col items-center text-gray-600 text-sm xl:text-lg xl:mb-10">
        <p>최대 여정 인원은 4명까지 선택 가능해요.</p>
      </div>
      <div className="flex h-[10%]">
        <SelectBuddyCounts />
      </div>
    </div>
  );
};

export default WelcomePage;
