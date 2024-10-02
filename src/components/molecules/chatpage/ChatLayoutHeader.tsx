'use client';

import { useRouter } from 'next/navigation';
import Arrow_Back from '../../../../public/svg/Arrow_back.svg';
const ChatLayoutHeader = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="relative h-[57px] w-full flex flex-row items-center px-5 bg-white xl:bg-grayscale-color-50 shadow-header-web">
      <div className="w-[calc(100%/3)] flex justify-start items-center">
        <Arrow_Back onClick={handleBack} className="cursor-pointer" />
      </div>
      <div className="w-[calc(100%/3)] flex justify-center items-center">
        <h1 className="text-center leading-3 text-xl font-semibold">여정채팅</h1>
      </div>
    </div>
  );
};
export default ChatLayoutHeader;
