'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type MainSectionWrapperProps = {
  children: React.ReactNode;
};

const MainSectionWrapper = ({ children }: MainSectionWrapperProps) => {
  const pathname = usePathname();

  const isHidePaddingBottom =
    pathname.startsWith('/chat/') ||
    pathname.startsWith('/stories/') ||
    pathname.startsWith('/write') ||
    pathname === '/write/story' ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/recover' ||
    pathname === '/onboarding' ||
    pathname === '/tutorial' ||
    pathname === '/trips';

  return (
    <main
      className={twMerge(
        'bg-grayscale-color-50 xl:bg-grayscale-color-50 h-auto min-h-dvh overflow-hidden xl:min-h-[calc(100dvh-100px)] xl:h-auto',
        pathname === '/tutorial' && 'bg-white xl:bg-white xl:min-h-[calc(100dvh-100px)]',
        pathname.startsWith('/stories/') && 'xl:max-h-[calc(100dvh-100px)]',
        pathname === '/trips' && 'xl:max-h-[calc(100dvh-100px)]',
        // pathname === '/stories' && 'xl:max-h-[calc(100dvh-100px)]',
        pathname.startsWith('/chat') && 'xl:min-h-0',
        pathname === '/onboarding' && 'xl:h-[calc(100dvh-100px)]',
        pathname.startsWith('/profile') &&
          !pathname.includes('mytrips') &&
          'xl:h-[calc(100dvh-100px)]',
      )}
    >
      <section
        className={twMerge(
          'relative max-w-[430px] min-w-[320px] mx-auto min-h-dvh pb-[54px] xl:pb-0 xl:w-[1080px] xl:max-w-[1280px]',
          pathname === '/tutorial' && 'bg-white xl:bg-white xl:min-h-[calc(100dvh-100px)]',
          isHidePaddingBottom && 'pb-0',
          pathname.startsWith('/write') &&
            'xl:min-h-[calc(100dvh-100px)] xl:h-[calc(100dvh-100px)]',
          pathname.startsWith('/stories/') &&
            'xl:min-h-[calc(100dvh-100px)] xl:h-[calc(100dvh-100px)]',
          pathname.startsWith('/chat') && 'xl:min-h-0',
        )}
      >
        {children}
      </section>
    </main>
  );
};

export default MainSectionWrapper;
//xl:pt-[100px]
