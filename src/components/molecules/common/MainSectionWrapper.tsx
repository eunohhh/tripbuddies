"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

type MainSectionWrapperProps = {
  children: React.ReactNode;
};

const MainSectionWrapper = ({ children }: MainSectionWrapperProps) => {
  const pathname = usePathname();

  const isHidePaddingBottom =
    pathname.startsWith("/chat/") ||
    pathname.startsWith("/stories/") ||
    pathname.startsWith("/write") ||
    pathname === "/write/story" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/recover" ||
    pathname === "/onboarding" ||
    pathname === "/tutorial" ||
    pathname === "/trips";

  return (
    <main
      className={twMerge(
        "h-auto min-h-dvh overflow-hidden bg-grayscale-color-50 xl:h-auto xl:min-h-[calc(100dvh-100px)] xl:bg-grayscale-color-50",
        pathname === "/tutorial" &&
          "bg-white xl:min-h-[calc(100dvh-100px)] xl:bg-white",
        pathname.startsWith("/stories/") && "xl:max-h-[calc(100dvh-100px)]",
        pathname === "/trips" && "xl:max-h-[calc(100dvh-100px)]",
        // pathname === '/stories' && 'xl:max-h-[calc(100dvh-100px)]',
        pathname.startsWith("/chat") && "xl:min-h-0",
        pathname === "/onboarding" && "xl:h-[calc(100dvh-100px)]",
        pathname.startsWith("/profile") &&
          !pathname.includes("mytrips") &&
          "xl:h-[calc(100dvh-100px)]",
      )}
    >
      <section
        className={twMerge(
          "relative mx-auto min-h-dvh min-w-[320px] max-w-[430px] pb-[54px] xl:w-[1080px] xl:max-w-[1280px] xl:pb-0",
          pathname === "/tutorial" &&
            "bg-white xl:min-h-[calc(100dvh-100px)] xl:bg-white",
          isHidePaddingBottom && "pb-0",
          pathname.startsWith("/write") &&
            "xl:h-[calc(100dvh-100px)] xl:min-h-[calc(100dvh-100px)]",
          pathname.startsWith("/stories/") &&
            "xl:h-[calc(100dvh-100px)] xl:min-h-[calc(100dvh-100px)]",
          pathname.startsWith("/chat") && "xl:min-h-0",
        )}
      >
        {children}
      </section>
    </main>
  );
};

export default MainSectionWrapper;
//xl:pt-[100px]
