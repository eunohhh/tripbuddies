'use client';
import { useUnreadMessagesContext } from '@/contexts/unreadMessages.context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import UnreadMessages from '../../atoms/chatpage/UnreadMessages';
import HeaderMyPageLink from '../../atoms/common/HeaderMyPageLink';

export default function Header() {
  const pathname = usePathname();

  // const totalUnreadCount = useChatStore(state => state.getTotalUnreadCount());\
  const { allUnreadCounts } = useUnreadMessagesContext();

  return (
    <header
      className={twMerge(
        'hidden xl:flex relative w-full h-[100px] items-center bg-white shadow-header-web justify-between z-50',
        pathname === '/tutorial' && 'xl:hidden',
      )}
    >
      <div className="w-[1080px] mx-auto flex items-center justify-between flex-row">
        <div className="flex gap-12 items-center justify-start font-bold w-[80%]">
          <Link href="/" className="relative w-[192px] h-[63px]">
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="w-auto h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </Link>
          <div className="flex gap-10 items-center justify-center flex-1 underline-offset-4 decoration-2">
            <Link
              href="/"
              className={pathname === '/' ? 'text-primary-color-400 underline' : 'text-black'}
            >
              HOME
            </Link>
            <Link
              href="/trips"
              className={pathname === '/trips' ? 'text-primary-color-400 underline' : 'text-black'}
            >
              여정
            </Link>
            <Link
              href="/chat"
              className={`relative
                                ${
                                  pathname === '/chat'
                                    ? 'text-primary-color-400 underline'
                                    : 'text-black'
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
