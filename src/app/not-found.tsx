import MascotImage from '@/components/atoms/common/MascotImage';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw">
      <h2 className="text-xl font-bold pb-2 pt-6">이런! 없는 페이지 같아요!</h2>

      <MascotImage intent="blue" className="w-3/4 h-3/4 xl:w-1/2 xl:h-1/2" />
      <Link className="text-white bg-primary-color-400 font-bold py-1 px-4 rounded" href="/">
        홈으로 돌아가기
      </Link>
      <div className="relative h-12 w-full"></div>
    </div>
  );
}
