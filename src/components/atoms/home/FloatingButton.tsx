'use client';

import { useAuth } from '@/hooks';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useRouter } from 'next/navigation';
import WriteIcon from '../../../../public/svg/WriteIcon.svg';

export default function FloatingButton() {
  // const [opacity, setOpacity] = useState(1);
  const { buddy } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (buddy) {
      router.push('/write');
      return;
    } else {
      showAlert('caution', '로그인이 필요한 서비스입니다.', {
        onConfirm: () => router.replace('/login'),
      });
    }
  };

  // useEffect(() => {
  //     const handleScroll = () => {
  //         const scrollY = window.scrollY;
  //         const newOpacity = Math.max(0.2, 1 - scrollY / 200); // 최소 투명도 0.2로 설정
  //         setOpacity(newOpacity);
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <button
      className="fixed bottom-16 right-1/2 transform translate-x-[49vw] sm:translate-x-[213px] xl:right-auto xl:left-1/2 xl:transform xl:translate-x-[495px] xl:bottom-2 bg-white text-white rounded-full p-[11px] shadow-lg z-[999]"
      // style={{ opacity }}
      onClick={handleClick}
    >
      <WriteIcon />
    </button>
  );
}

// <div className="fixed bottom-0 right-1/2 translate-x-1/2 w-dvw min-w-[360px] max-w-[430px] xl:w-dvw xl:max-w-[1080px] h-dvh mx-auto">
