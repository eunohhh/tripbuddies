'use client';

import LoaderOnly from '@/components/atoms/common/LoaderOnly';
import MascotImage from '@/components/atoms/common/MascotImage';
import Center2xlTwoLineText from '@/components/atoms/write/Center2xlTwoLineText';

export default function PendingPage({ isFile }: { isFile: boolean }) {
  return (
    <>
      <div className="fixed top-0 left-0 h-dvh w-dvw flex justify-center items-center bg-black/40 z-[999999]">
        {isFile ? (
          <div className="flex flex-col items-center justify-center">
            <LoaderOnly />
            <p className="text-center font-bold text-white text-sm">...여정 작성중...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <LoaderOnly />
            <p className="text-center font-bold text-white text-sm">
              ...이미지 생성중...
              <br />
              이미지 생성에는 20초 정도의 시간이 소요됩니다
            </p>
          </div>
        )}
      </div>
      <div className="relative mt-2 h-full">
        <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50" />
        <Center2xlTwoLineText
          className="relative h-[15%]"
          firstText="버디가 열심히 글을"
          secondText="작성하고 있어요!"
        />
        <div className="relative h-[40%] flex justify-center items-center">
          <div className="flex justify-center h-[230px] w-[300px] xl:h-[400px] xl:w-[400px] mx-auto">
            <MascotImage intent="main" className="w-[70%] h-[70%]" />
          </div>
        </div>
      </div>
    </>
  );
}
