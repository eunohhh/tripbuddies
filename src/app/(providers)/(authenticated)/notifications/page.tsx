import NotificationsListDesktop from '@/components/organisms/notifications/NotificationsListDesktop';
import NotificationsListMobile from '@/components/organisms/notifications/NotificationsListMobile';

const NotificationsPage = () => {
  return (
    <div className="xl:bg-transparent xl:h-[calc(100vh-100px)] bg-white border-t-2 border-gray-200 h-[calc(100vh-131px)]">
      <h1 className="xl:flex hidden text-grayscale-800 text-[24px] font-semibold my-[30px]">
        알림
      </h1>
      <div className="block xl:hidden">
        <NotificationsListMobile />
      </div>
      <div className="hidden xl:block">
        <NotificationsListDesktop />
      </div>
    </div>
  );
};

export default NotificationsPage;
