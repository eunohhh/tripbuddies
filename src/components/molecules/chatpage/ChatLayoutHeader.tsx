"use client";

import { useRouter } from "next/navigation";
import { ArrowBack as Arrow_Back } from "@/components/icons/ArrowBack";

const ChatLayoutHeader = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="relative flex h-[57px] w-full flex-row items-center bg-white px-5 shadow-header-web xl:bg-grayscale-color-50">
      <div className="flex w-[calc(100%/3)] items-center justify-start">
        <Arrow_Back onClick={handleBack} className="cursor-pointer" />
      </div>
      <div className="flex w-[calc(100%/3)] items-center justify-center">
        <h1 className="text-center font-semibold text-xl leading-3">
          여정채팅
        </h1>
      </div>
    </div>
  );
};
export default ChatLayoutHeader;
