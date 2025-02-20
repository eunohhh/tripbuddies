import { getBuddyServer } from '@/api-services/auth/server';
import { getNotifications } from '@/api-services/notification';
import Header from '@/components/molecules/common/Header';
import MainSectionWrapper from '@/components/molecules/common/MainSectionWrapper';
import MobileHeader from '@/components/molecules/common/MobileHeader';
import TapMenu from '@/components/molecules/common/TapMenu';
import { QUERY_KEY_BUDDY, QUERY_KEY_NOTIFICATION } from '@/constants/query.constants';
import { AuthProvider } from '@/contexts/auth.context';
import { LocationProvider } from '@/contexts/locationSearch.context';
import { ModalProviderDefault } from '@/contexts/modal.context';
import { NotificationProvider } from '@/contexts/notification.context';
import { UnreadMessagesProvider } from '@/contexts/unreadMessages.context';
import { defaultMetaData } from '@/data/defaultMetaData';
import { ModalProviderSetter } from '@/providers/ModalProvider';
import { Notification } from '@/types/Notification.types';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { PropsWithChildren, Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = defaultMetaData;

const ProvidersLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const userId = getUserFromHeader();

  // console.log('헤더에서 user =====>', userId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_BUDDY],
    queryFn: () => getBuddyServer(userId),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_NOTIFICATION],
    queryFn: () => getNotifications({ buddyId: userId ?? '' }),
  });
  const dehydratedState = dehydrate(queryClient);

  const notifications = await queryClient.getQueryData<Notification[]>([QUERY_KEY_NOTIFICATION]);

  const filteredNotifications = notifications?.filter(
    (notification) => notification.notification_receiver === userId,
  );

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <ModalProviderDefault>
          <AuthProvider>
            <NotificationProvider initialNotifications={filteredNotifications}>
              <UnreadMessagesProvider>
                <Header />
                <MainSectionWrapper>
                  <ModalProviderSetter>
                    <MobileHeader />
                    <LocationProvider>{children}</LocationProvider>
                    <TapMenu />
                  </ModalProviderSetter>
                </MainSectionWrapper>
              </UnreadMessagesProvider>
            </NotificationProvider>
          </AuthProvider>
        </ModalProviderDefault>
      </HydrationBoundary>
    </Suspense>
  );
};

export default ProvidersLayout;
