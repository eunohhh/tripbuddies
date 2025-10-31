import NotificationsListDesktop from "@/components/organisms/notifications/NotificationsListDesktop";
import NotificationsListMobile from "@/components/organisms/notifications/NotificationsListMobile";

const NotificationsPage = () => {
  return (
    <div className="h-[calc(100vh-131px)] border-gray-200 border-t-2 bg-white xl:h-[calc(100vh-100px)] xl:bg-transparent">
      <h1 className="my-[30px] hidden font-semibold text-[24px] text-grayscale-800 xl:flex">
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
