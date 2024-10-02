'use client';

import { useAuth } from '@/hooks';
import Link from 'next/link';
import React from 'react';
import MyPageIcon from '../../../../public/svg/mypageicon.svg';
import NotificationButton from './NotificationButton';

const HeaderMyPageLink: React.FC = () => {
  const { buddy, logOut } = useAuth();

  const buddy_id = buddy ? buddy.buddy_id : null;

  return (
    <div className="flex gap-[28px] items-center font-bold">
      {buddy_id ? <button onClick={logOut}>LOGOUT</button> : <Link href="/login">LOGIN</Link>}
      {!buddy_id && <Link href="/signup">JOIN</Link>}

      {buddy_id && <NotificationButton />}

      <Link href={buddy_id ? `/profile/${buddy_id}` : '/login'}>
        <MyPageIcon className={buddy_id ? 'text-primary-color-400' : 'text-black'} />
      </Link>
    </div>
  );
};

export default HeaderMyPageLink;
