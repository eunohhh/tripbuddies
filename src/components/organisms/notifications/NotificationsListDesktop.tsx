'use client';
import NotificationListItem from '@/components/molecules/notifications/NotificationListItem';
import { useNotification } from '@/hooks/notification/useNotification';
import { useState } from 'react';
import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';

const NotificationsListDesktop = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 6;
  const totalNotifications = allNotifications.length;
  const totalPages = Math.ceil(totalNotifications / notificationsPerPage);

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  const currentNotifications = allNotifications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <ul className="flex flex-col gap-[18px]">
        {currentNotifications.map((notification) => (
          <NotificationListItem key={notification.notification_id} notification={notification} />
        ))}
      </ul>
      <div className="w-full justify-center items-center flex mt-4">
        <div className="flex justify-center items-center gap-3">
          <div
            className={`text-2xl ${currentPage === 1 ? 'text-grayscale-color-300 cursor-default' : 'text-grayscale-color-800 cursor-pointer'}`}
            data-next="before"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <RxTriangleLeft />
          </div>
          <div className="my-[30px] flex justify-center items-center gap-[16px] min-w-[100px]">
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={`text-[16px]  ${twMerge(
                  'text-grayscale-color-700',
                  page === currentPage && 'text-grayscale-color-800 font-semibold',
                )}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <div
            className={`text-2xl ${currentPage === totalPages ? 'text-grayscale-color-300 cursor-default' : 'text-grayscale-color-800  cursor-pointer'}`}
            data-next="after"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <RxTriangleRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsListDesktop;
