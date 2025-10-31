"use client";

import MascotImage from "@/components/atoms/common/MascotImage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex h-[calc(100vh-56px-54px)] min-w-[320px] max-w-[430px] flex-col items-center justify-center xl:h-[calc(100vh-100px-50px)] xl:w-[1080px] xl:max-w-[1280px]">
          <h2 className="pt-6 pb-2 font-bold text-xl">
            이런! 오류가 발생했어요!
          </h2>

          <MascotImage
            intent="blue"
            className="h-3/4 w-3/4 xl:h-1/2 xl:w-1/2"
          />
          <button
            type="button"
            className="rounded bg-primary-color-400 px-4 py-1 font-bold text-white"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            다시 시도하기
          </button>
        </div>
      </body>
    </html>
  );
}
