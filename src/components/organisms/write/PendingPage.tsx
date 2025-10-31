"use client";

import LoaderOnly from "@/components/atoms/common/LoaderOnly";
import MascotImage from "@/components/atoms/common/MascotImage";
import Center2xlTwoLineText from "@/components/atoms/write/Center2xlTwoLineText";

export default function PendingPage({ isFile }: { isFile: boolean }) {
  return (
    <>
      <div className="fixed top-0 left-0 z-[999999] flex h-dvh w-dvw items-center justify-center bg-black/40">
        {isFile ? (
          <div className="flex flex-col items-center justify-center">
            <LoaderOnly />
            <p className="text-center font-bold text-sm text-white">
              ...여정 작성중...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <LoaderOnly />
            <p className="text-center font-bold text-sm text-white">
              ...이미지 생성중...
              <br />
              이미지 생성에는 20초 정도의 시간이 소요됩니다
            </p>
          </div>
        )}
      </div>
      <div className="relative mt-2 h-full">
        <div className="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center" />
        <Center2xlTwoLineText
          className="relative h-[15%]"
          firstText="버디가 열심히 글을"
          secondText="작성하고 있어요!"
        />
        <div className="relative flex h-[40%] items-center justify-center">
          <div className="mx-auto flex h-[230px] w-[300px] justify-center xl:h-[400px] xl:w-[400px]">
            <MascotImage intent="main" className="h-[70%] w-[70%]" />
          </div>
        </div>
      </div>
    </>
  );
}
