"use client";

import Link from "next/link";
import React from "react";
import { MyPageIcon } from "@/components/icons/MyPageIcon";
import { useAuth } from "@/hooks";
import NotificationButton from "./NotificationButton";

const HeaderMyPageLink: React.FC = () => {
  const { buddy, logOut } = useAuth();

  const buddy_id = buddy ? buddy.buddy_id : null;

  return (
    <div className="flex items-center gap-[28px] font-bold">
      {buddy_id ? (
        <button type="button" onClick={logOut}>
          LOGOUT
        </button>
      ) : (
        <Link href="/login">LOGIN</Link>
      )}
      {!buddy_id && <Link href="/signup">JOIN</Link>}

      {buddy_id && <NotificationButton />}

      <Link href={buddy_id ? `/profile/${buddy_id}` : "/login"}>
        <MyPageIcon
          className={buddy_id ? "text-primary-color-400" : "text-black"}
        />
      </Link>
    </div>
  );
};

export default HeaderMyPageLink;
