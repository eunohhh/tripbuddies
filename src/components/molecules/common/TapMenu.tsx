"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import TapMenuButton from "@/components/atoms/common/TapMenuButton";
import { useAuth } from "@/hooks";

// import { useNotification } from '@/hooks/notification/useNotification';

const TapMenu: React.FC = () => {
  const { buddy } = useAuth();
  const pathname = usePathname();
  const buddy_id = buddy ? buddy.buddy_id : "";

  // const { notifications } = useNotification();

  // useEffect(() => {
  //     console.log('하단바에서 notifications 변경사항 ====>', notifications);
  // }, [notifications]);

  const hidden =
    pathname.startsWith("/chat/") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/recover" ||
    pathname === "/tutorial";

  // 아래 svg 들 svgr 로 추후 수정 요망
  return (
    <div
      className={twMerge(
        "-translate-x-1/2 fixed bottom-0 left-1/2 z-[99] grid h-[54px] w-full min-w-[375px] max-w-[430px] transform grid-cols-4 border-gray-200 bg-white shadow-tap-menu xl:hidden",
        hidden && "hidden",
      )} // 변경 필요
    >
      <TapMenuButton iconName="Home" href="/" title="홈" />
      <TapMenuButton iconName="Trip" href="/trips" title="여정" />
      <TapMenuButton
        iconName="Chat"
        href={buddy_id ? `/chat` : "/login"}
        title="채팅"
      />
      <TapMenuButton
        iconName="MyPage"
        href={buddy_id ? `/profile/${buddy_id}` : "/login"}
        title="마이페이지"
      />
    </div>
  );
};

export default TapMenu;
