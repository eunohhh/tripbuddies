'use client';
import NotificationListItem from '@/components/molecules/notifications/NotificationListItem';
import { useNotification } from '@/hooks/notification/useNotification';

const NotificationsListMobile = () => {
  const { notifications } = useNotification();

  const allNotifications = [
    ...notifications.storyLikes,
    ...notifications.follows,
    ...notifications.bookmarks,
    ...notifications.contracts,
  ];

  allNotifications.sort(
    (a, b) =>
      new Date(b.notification_created_at).getTime() - new Date(a.notification_created_at).getTime(),
  );

  return (
    <ul className="my-[20px] xl:my-0 flex flex-col xl:gap-[10px]">
      {allNotifications.map((notification) => (
        <NotificationListItem key={notification.notification_id} notification={notification} />
      ))}
    </ul>
  );
};

export default NotificationsListMobile;
