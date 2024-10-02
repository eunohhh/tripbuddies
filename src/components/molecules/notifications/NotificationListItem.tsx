'use client';

import { useNotificationMutation } from '@/hooks/queries';
import { Notification } from '@/types/Notification.types';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface NotificationListItemProps {
  notification: Notification;
}

const NotificationListItem: React.FC<NotificationListItemProps> = ({ notification }) => {
  const queryClient = useQueryClient();
  const timeSinceUpload = getTimeSinceUpload(notification.notification_created_at);
  const router = useRouter();

  const { mutate: mutateNotification, error: notificationError } = useNotificationMutation();

  const getNotificationUrl = (notification: Notification) => {
    switch (notification.notification_type) {
      case 'follow':
        return `/profile/${notification.notification_origin_id}`;
      case 'bookmark':
        return `/trips/${notification.notification_origin_id}`;
      case 'contract':
        return `/trips/${notification.notification_origin_id}`;
      case 'like':
        return `/stories/${notification.notification_origin_id}`;
      default:
        return '/notifications';
    }
  };

  const url = getNotificationUrl(notification);

  const handleClick = async () => {
    if (!notification.notification_isRead) {
      const updatedNotification = {
        ...notification,
        notification_isRead: true,
      };
      mutateNotification(updatedNotification);
      // queryClient.invalidateQueries({
      //     queryKey: [QUERY_KEY_NOTIFICATION],
      // });
      router.push(url);
    }

    // window.location.href = url; // 알림 누르면 unread 반영되기 위해 새로고침 되도록 임시 설정
  };

  return (
    <li>
      <div
        className="bg-white rounded-[16px] flex px-[20px] py-[12px] gap-[10px] cursor-pointer xl:bg-grayscale-color-70"
        onClick={handleClick}
      >
        <div>
          <Image
            src={'/images/mascot_main.webp'}
            alt={'mascot_main'}
            width={45}
            height={45}
            className="relative w-auto h-auto"
          />
        </div>
        <div>
          <p className="text-[16px] font-bold text-grayscale-color-800">
            {notification.notification_content}
          </p>
          <p className="text-[14px] font-medium text-grayscale-color-500">{timeSinceUpload}</p>
        </div>
      </div>
    </li>
  );
};

export default NotificationListItem;
