"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useUnreadMessagesContext } from "@/contexts/unreadMessages.context";
import UnreadMessages from "../../atoms/chatpage/UnreadMessages";
import HeaderMyPageLink from "../../atoms/common/HeaderMyPageLink";

export default function Header() {
  const pathname = usePathname();

  // const totalUnreadCount = useChatStore(state => state.getTotalUnreadCount());\
  const { allUnreadCounts } = useUnreadMessagesContext();

  return (
    <header
      className={twMerge(
        "relative z-50 hidden h-[100px] w-full items-center justify-between bg-white shadow-header-web xl:flex",
        pathname === "/tutorial" && "xl:hidden",
      )}
    >
      <div className="mx-auto flex w-[1080px] flex-row items-center justify-between">
        <div className="flex w-[80%] items-center justify-start gap-12 font-bold">
          <Link href="/" className="relative h-[63px] w-[192px]">
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="h-auto w-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </Link>
          <div className="flex flex-1 items-center justify-center gap-10 decoration-2 underline-offset-4">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-primary-color-400 underline"
                  : "text-black"
              }
            >
              HOME
            </Link>
            <Link
              href="/trips"
              className={
                pathname === "/trips"
                  ? "text-primary-color-400 underline"
                  : "text-black"
              }
            >
              여정
            </Link>
            <Link
              href="/chat"
              className={`relative ${
                pathname === "/chat"
                  ? "text-primary-color-400 underline"
                  : "text-black"
              }
                            `}
            >
              여정채팅
              {allUnreadCounts > 0 && (
                <div className="absolute top-[-2px] right-[-28px] z-100 scale-[0.8]">
                  <UnreadMessages unread_count={allUnreadCounts} />
                </div>
              )}
            </Link>
          </div>
        </div>
        <HeaderMyPageLink />
      </div>
    </header>
  );
}
