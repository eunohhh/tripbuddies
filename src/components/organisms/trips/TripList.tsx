'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TripListDesktop from './TripListDeskTop';
import TripListMobile from './TripListMobile';

const TripList: React.FC = () => {
  const [isMobile, setIsMobile] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsMobile('mobile');
      } else {
        setIsMobile('desktop');
      }
    };

    let debounceTimer: NodeJS.Timeout;

    const debouncedHandleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleResize();
        router.refresh();
      }, 200); // 200ms 후에 마지막 resize 이벤트가 발생한 경우에만 새로고침
    };

    handleResize(); // 초기 렌더링 시 크기 확인
    window.addEventListener('resize', debouncedHandleResize); // 창 크기 변경 시 handleResize 호출

    return () => {
      window.removeEventListener('resize', debouncedHandleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [router]);

  if (!isMobile) return <DefaultLoader />;
  if (isMobile === 'mobile') return <TripListMobile />;
  if (isMobile === 'desktop') return <TripListDesktop />;
};

export default TripList;
