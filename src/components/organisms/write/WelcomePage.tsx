import React from "react";
import { twMerge } from "tailwind-merge";
import MascotImage from "@/components/atoms/common/MascotImage";
import WelcomeMessage from "@/components/molecules/write/WelcomeMessage";

type WelcomePageProps = {
  SelectBuddyCounts: React.FC;
  isMini?: boolean;
};

const WelcomePage: React.FC<WelcomePageProps> = ({
  SelectBuddyCounts,
  isMini,
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <WelcomeMessage />
      <div
        className={twMerge(
          "mx-auto flex h-[50%] w-[300px] justify-center xl:h-[300px] xl:w-[300px]",
          isMini && "h-[180px] w-[200px]",
        )}
      >
        <MascotImage intent="main" className="h-[70%] w-[70%]" />
      </div>
      <div className="flex h-[10%] items-center justify-center text-2xl xl:mt-1 xl:mb-1">
        여정 인원을 선택해주세요
      </div>
      <div className="flex h-[3%] flex-col items-center text-gray-600 text-sm xl:mb-10 xl:text-lg">
        <p>최대 여정 인원은 4명까지 선택 가능해요.</p>
      </div>
      <div className="flex h-[10%]">
        <SelectBuddyCounts />
      </div>
    </div>
  );
};

export default WelcomePage;
