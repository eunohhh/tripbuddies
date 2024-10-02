'use client';

import ContractModal from '@/components/organisms/contract/ContractModal';
import { useAuth } from '@/hooks';
import { useContractQueries, useNotificationQuery } from '@/hooks/queries';
import { Buddy } from '@/types/Auth.types';
import {
  ClassifiedNotification,
  Notification,
  NotificationContextType,
} from '@/types/Notification.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import supabase from '@/utils/supabase/client';
import { showAlert } from '@/utils/ui/openCustomAlert';
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from './modal.context';

type NotificationProviderProps = {
  initialNotifications: Notification[] | undefined;
};

const initialValue: NotificationContextType = {
  notifications: {
    storyLikes: [],
    follows: [],
    bookmarks: [],
    contracts: [],
  },
  hasNotification: false,
};

export const NotificationContext = createContext<NotificationContextType>(initialValue);

export const NotificationProvider = ({
  children,
  initialNotifications,
}: PropsWithChildren<NotificationProviderProps>) => {
  const { buddy } = useAuth();

  const { data, isPending: isPendingNotification, error } = useNotificationQuery();

  const filteredNotifications = data?.filter(
    (notification) => notification.notification_receiver === buddy?.buddy_id,
  );
  const initial = filteredNotifications || initialNotifications;

  const [notifications, setNotifications] = useState<ClassifiedNotification>({
    storyLikes:
      initial?.filter(
        (notification) =>
          notification.notification_type === 'like' &&
          notification.notification_isRead === false &&
          notification.notification_sender !== buddy?.buddy_id,
      ) || [],
    follows:
      initial?.filter(
        (notification) =>
          notification.notification_type === 'follow' &&
          notification.notification_isRead === false &&
          notification.notification_sender !== buddy?.buddy_id,
      ) || [],
    bookmarks:
      initial?.filter(
        (notification) =>
          notification.notification_type === 'bookmark' &&
          notification.notification_isRead === false &&
          notification.notification_sender !== buddy?.buddy_id,
      ) || [],
    contracts:
      initial?.filter(
        (notification) =>
          notification.notification_type === 'contract' &&
          notification.notification_isRead === false &&
          notification.notification_sender !== buddy?.buddy_id,
      ) || [],
  });

  const modal = useModal();
  const prevNotificationsRef = useRef(notifications);
  const hasFetchedOnceRef = useRef(false);
  const [hasNotification, setHasNotification] = useState(false);

  const queries = useContractQueries(
    notifications.contracts
      .map((notification) => notification.notification_origin_id)
      .filter((id): id is string => id !== null),
  );

  const handleRealTimePostsInsertUpdate = useCallback(
    (
      payload:
        | RealtimePostgresInsertPayload<Notification>
        | RealtimePostgresUpdatePayload<Notification>,
    ) => {
      if (
        payload.new.notification_receiver === buddy?.buddy_id &&
        payload.new.notification_sender !== buddy?.buddy_id
      ) {
        if (payload.new.notification_type === 'like') {
          setNotifications((prev) => {
            // notification_isRead 값이 false인 경우만 추가
            if (
              payload.new.notification_isRead === false &&
              !prev.storyLikes.some(
                (notification) => notification.notification_id === payload.new.notification_id,
              )
            ) {
              return {
                ...prev,
                storyLikes: [...prev.storyLikes, payload.new],
              };
            } else {
              return {
                ...prev,
                storyLikes: prev.storyLikes.filter(
                  (item) => item.notification_id !== payload.new.notification_id,
                ),
              };
            }
          });
        }
        if (payload.new.notification_type === 'follow') {
          setNotifications((prev) => {
            if (
              payload.new.notification_isRead === false &&
              !prev.follows.some(
                (notification) => notification.notification_id === payload.new.notification_id,
              )
            ) {
              return {
                ...prev,
                follows: [...prev.follows, payload.new],
              };
            } else {
              return {
                ...prev,
                follows: prev.follows.filter(
                  (item) => item.notification_id !== payload.new.notification_id,
                ),
              };
            }
          });
        }
        if (payload.new.notification_type === 'bookmark') {
          setNotifications((prev) => {
            if (
              payload.new.notification_isRead === false &&
              !prev.bookmarks.some(
                (notification) => notification.notification_id === payload.new.notification_id,
              )
            ) {
              return {
                ...prev,
                bookmarks: [...prev.bookmarks, payload.new],
              };
            } else {
              return {
                ...prev,
                bookmarks: prev.bookmarks.filter(
                  (item) => item.notification_id !== payload.new.notification_id,
                ),
              };
            }
          });
        }
        if (payload.new.notification_type === 'contract') {
          setNotifications((prev) => {
            if (
              payload.new.notification_isRead === false &&
              !prev.contracts.some(
                (notification) => notification.notification_id === payload.new.notification_id,
              )
            ) {
              return {
                ...prev,
                contracts: [...prev.contracts, payload.new],
              };
            } else {
              return {
                ...prev,
                contracts: prev.contracts.filter(
                  (item) => item.notification_id !== payload.new.notification_id,
                ),
              };
            }
          });
        }
      }
    },
    [buddy],
  );

  const handleRealTimePostsDelete = useCallback(
    (payload: RealtimePostgresDeletePayload<Notification>) => {
      const notification = notifications.storyLikes.find(
        (notification) => notification.notification_id === payload.old.notification_id,
      );

      const followNotification = notifications.follows.find(
        (notification) => notification.notification_id === payload.old.notification_id,
      );
      const bookmarkNotification = notifications.bookmarks.find(
        (notification) => notification.notification_id === payload.old.notification_id,
      );
      const contractNotification = notifications.contracts.find(
        (notification) => notification.notification_id === payload.old.notification_id,
      );

      if (notification) {
        setNotifications((prev) => {
          if (
            payload.old.notification_isRead === false &&
            !prev.storyLikes.some(
              (notification) => notification.notification_id === payload.old.notification_id,
            )
          ) {
            return {
              ...prev,
              storyLikes: prev.storyLikes.filter(
                (item) => item.notification_id !== payload.old.notification_id,
              ),
            };
          } else {
            return prev;
          }
        });
      }
      if (followNotification) {
        setNotifications((prev) => {
          if (
            payload.old.notification_isRead === false &&
            !prev.follows.some(
              (notification) => notification.notification_id === payload.old.notification_id,
            )
          ) {
            return {
              ...prev,
              follows: prev.follows.filter(
                (item) => item.notification_id !== payload.old.notification_id,
              ),
            };
          } else {
            return prev;
          }
        });
      }
      if (bookmarkNotification) {
        setNotifications((prev) => {
          if (
            payload.old.notification_isRead === false &&
            !prev.bookmarks.some(
              (notification) => notification.notification_id === payload.old.notification_id,
            )
          ) {
            return {
              ...prev,
              bookmarks: prev.bookmarks.filter(
                (item) => item.notification_id !== payload.old.notification_id,
              ),
            };
          } else {
            return prev;
          }
        });
      }
      if (contractNotification) {
        setNotifications((prev) => {
          if (
            payload.old.notification_isRead === false &&
            !prev.contracts.some(
              (notification) => notification.notification_id === payload.old.notification_id,
            )
          ) {
            return {
              ...prev,
              contracts: prev.contracts.filter(
                (item) => item.notification_id !== payload.old.notification_id,
              ),
            };
          } else {
            return prev;
          }
        });
      }
    },
    [notifications],
  );

  useEffect(() => {
    const allChanges = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        handleRealTimePostsInsertUpdate,
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          // filter: `notification_isRead=eq.false`,
        },
        handleRealTimePostsDelete,
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
        },
        handleRealTimePostsInsertUpdate,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(allChanges);
    };
  }, [buddy, handleRealTimePostsDelete, handleRealTimePostsInsertUpdate]);

  useEffect(() => {
    const filteredNotifications = data?.filter(
      (notification) => notification.notification_receiver === buddy?.buddy_id,
    );
    setNotifications({
      storyLikes:
        filteredNotifications?.filter(
          (notification) =>
            notification.notification_type === 'like' &&
            notification.notification_isRead === false &&
            notification.notification_sender !== buddy?.buddy_id,
        ) || [],
      follows:
        filteredNotifications?.filter(
          (notification) =>
            notification.notification_type === 'follow' &&
            notification.notification_isRead === false &&
            notification.notification_sender !== buddy?.buddy_id,
        ) || [],
      bookmarks:
        filteredNotifications?.filter(
          (notification) =>
            notification.notification_type === 'bookmark' &&
            notification.notification_isRead === false &&
            notification.notification_sender !== buddy?.buddy_id,
        ) || [],
      contracts:
        filteredNotifications?.filter(
          (notification) =>
            notification.notification_type === 'contract' &&
            notification.notification_isRead === false &&
            notification.notification_sender !== buddy?.buddy_id,
        ) || [],
    });
  }, [data, buddy]);

  const isPending = queries.some((query) => query.isPending);

  useEffect(() => {
    if (isPending) return;
    if (queries.length === 0) return;

    const prevNotifications = prevNotificationsRef.current;
    async function fetchSpecificBuddy() {
      const notIsReadContracts = notifications.contracts.filter(
        (notification) => notification.notification_isRead === false,
      );
      const promises = notIsReadContracts.map(async (notification) => {
        const url = `/api/buddyProfile/buddy?id=${notification.notification_sender}`;
        const promise = fetchWrapper<Buddy>(url, { method: 'GET' });
        return promise;
      });
      const data = await Promise.all(promises);
      return data;
    }

    // 최초 실행 또는 notifications가 변경된 경우에만 실행
    if (
      !hasFetchedOnceRef.current ||
      !prevNotifications ||
      prevNotifications.contracts.length !== notifications.contracts.length ||
      JSON.stringify(prevNotifications.contracts) !== JSON.stringify(notifications.contracts)
    ) {
      prevNotificationsRef.current = notifications;
      hasFetchedOnceRef.current = true; // 최초 실행 여부를 기록

      if (!modal) return;

      fetchSpecificBuddy()
        .then((data) => {
          if (data.length > 0) {
            showAlert('caution', `새로운 참여 요청이 ${data.length}건 있습니다.`, {
              onConfirm: () => {
                modal.openModal({
                  component: () => (
                    <ContractModal
                      queries={queries}
                      notifications={notifications.contracts}
                      buddies={data}
                      mode="notification"
                    />
                  ),
                });
              },
            });
          }
        })
        .catch((error) => {
          console.error('error ====>', error);
        });
    }
  }, [modal, queries, notifications, isPending]);

  useEffect(() => {
    if (!buddy) return;
    const hasUnreadNotifications =
      (notifications.storyLikes.length > 0 &&
        notifications.storyLikes.some(
          (notification) => notification.notification_sender !== buddy?.buddy_id,
        )) ||
      (notifications.follows.length > 0 &&
        notifications.follows.some(
          (notification) => notification.notification_sender !== buddy?.buddy_id,
        )) ||
      (notifications.bookmarks.length > 0 &&
        notifications.bookmarks.some(
          (notification) => notification.notification_sender !== buddy?.buddy_id,
        )) ||
      (notifications.contracts.length > 0 &&
        notifications.contracts.some(
          (notification) => notification.notification_sender !== buddy?.buddy_id,
        ));
    setHasNotification(hasUnreadNotifications);
  }, [notifications, buddy]);

  useEffect(() => {
    console.log('notifications 상태 변경 ====>', notifications);
  }, [notifications]);

  useEffect(() => {
    if (error) {
      const message = error.message;
      showAlert('error', message);
    }
  }, [error]);

  return (
    <NotificationContext.Provider value={{ notifications, hasNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
