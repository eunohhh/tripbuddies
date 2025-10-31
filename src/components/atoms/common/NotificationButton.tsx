"use client";
import Link from "next/link";
import { Alarm } from "@/components/icons/Alarm";
import { useNotification } from "@/hooks/notification/useNotification";

const NotificationButton = () => {
  const { hasNotification } = useNotification();

  return (
    <Link href="/notifications" className="relative cursor-pointer">
      <Alarm />
      {hasNotification && (
        <div className="absolute top-0 right-0 box-content h-[8px] w-[8px] rounded-full border-2 border-white bg-[#E12B56]"></div>
      )}
    </Link>
  );
};

export default NotificationButton;
