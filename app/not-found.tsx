import Link from "next/link";
import MascotImage from "@/components/atoms/common/MascotImage";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <h2 className="pt-6 pb-2 font-bold text-xl">이런! 없는 페이지 같아요!</h2>

      <MascotImage intent="blue" className="h-3/4 w-3/4 xl:h-1/2 xl:w-1/2" />
      <Link
        className="rounded bg-primary-color-400 px-4 py-1 font-bold text-white"
        href="/"
      >
        홈으로 돌아가기
      </Link>
      <div className="relative h-12 w-full"></div>
    </div>
  );
}
