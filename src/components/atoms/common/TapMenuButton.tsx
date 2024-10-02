'use client';

import { useUnreadMessagesContext } from '@/contexts/unreadMessages.context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Chat from '../../../../public/svg/Chat.svg';
import Home from '../../../../public/svg/Home.svg';
import Mypage from '../../../../public/svg/Mypage.svg';
import Trip from '../../../../public/svg/Trip.svg';
import UnreadMessages from '../chatpage/UnreadMessages';
interface TapMenuButtonProps {
  iconName: string;
  href: string;
  title: string;
}

const TapMenuButton: React.FC<TapMenuButtonProps> = ({ iconName, href, title }) => {
  const pathname = usePathname();

  // const totalUnreadCount = useChatStore(state => state.getTotalUnreadCount());

  const { allUnreadCounts } = useUnreadMessagesContext();

  // const totalUnreadCount = contractUnreadCounts[contract_trip_id];

  return (
    <Link href={href}>
      <button className="flex flex-col items-center justify-center w-full h-full focus:outline-none relative">
        {iconName === 'Home' && (
          <Home
            className={twMerge(
              'w-6 h-6',
              pathname === href ? 'text-primary-color-400' : 'text-grayscale-color-300',
            )}
          />
        )}
        {iconName === 'Trip' && (
          <Trip
            className={twMerge(
              'w-6 h-6',
              pathname === href ? 'text-primary-color-400' : 'text-grayscale-color-300',
            )}
          />
        )}
        {iconName === 'Chat' && (
          <Chat
            className={twMerge(
              'w-6 h-6',
              pathname === '/chat' ? 'text-primary-color-400' : 'text-grayscale-color-300',
            )}
          />
        )}
        {iconName === 'MyPage' && (
          <Mypage
            className={twMerge(
              'w-6 h-6',
              pathname.startsWith('/profile')
                ? 'text-primary-color-400'
                : 'text-grayscale-color-300',
            )}
          />
        )}
        {iconName === 'Chat' && allUnreadCounts > 0 && (
          <div className="absolute top-[4px] right-[14px] z-100">
            <UnreadMessages unread_count={allUnreadCounts} />
          </div>
        )}
        <span
          className={twMerge(
            'text-[12px] font-bold',
            pathname === href ? 'text-primary-color-400' : 'text-grayscale-color-300',
          )}
        >
          {title}
        </span>
      </button>
    </Link>
  );
};

export default TapMenuButton;
