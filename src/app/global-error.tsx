'use client';

import MascotImage from '@/components/atoms/common/MascotImage';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center max-w-[430px] min-w-[320px] xl:w-[1080px] xl:max-w-[1280px] h-[calc(100vh-56px-76px)] xl:h-[calc(100vh-100px-50px)]">
                    <h2 className="text-xl font-bold pb-2 pt-6">
                        이런! 오류가 발생했어요!
                    </h2>

                    <MascotImage
                        intent="blue"
                        className="w-3/4 h-3/4 xl:w-1/2 xl:h-1/2"
                    />
                    <button
                        className="text-white bg-primary-color-400 font-bold py-1 px-4 rounded"
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
