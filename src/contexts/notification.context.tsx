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
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
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

type ActionType = 'like' | 'follow' | 'bookmark' | 'contract';

type Action = {
  type: {
    changeType: 'new' | 'old';
    ActionType: ActionType;
  };
  payload:
    | RealtimePostgresInsertPayload<Notification>
    | RealtimePostgresUpdatePayload<Notification>
    | RealtimePostgresDeletePayload<Notification>;
};

const reducer = (notifications: ClassifiedNotification, action: Action) => {
  switch (action.type.ActionType) {
    case 'like':
      if (
        !notifications.storyLikes.some(
          (notification) =>
            notification.notification_id ===
            (action.payload[action.type.changeType] as Notification).notification_id,
        )
      ) {
        return {
          ...notifications,
          storyLikes: [
            ...notifications.storyLikes,
            action.payload[action.type.changeType] as Notification,
          ],
        };
      } else {
        return {
          ...notifications,
          storyLikes: notifications.storyLikes.filter(
            (item) =>
              item.notification_id !==
              (action.payload[action.type.changeType] as Notification).notification_id,
          ),
        };
      }
    case 'follow':
      if (
        notifications.follows.some(
          (notification) =>
            notification.notification_id ===
            (action.payload[action.type.changeType] as Notification).notification_id,
        )
      ) {
        return {
          ...notifications,
          follows: notifications.follows.filter(
            (item) =>
              item.notification_id !==
              (action.payload[action.type.changeType] as Notification).notification_id,
          ),
        };
      } else {
        return {
          ...notifications,
          follows: [
            ...notifications.follows,
            action.payload[action.type.changeType] as Notification,
          ],
        };
      }
    case 'bookmark':
      if (
        notifications.bookmarks.some(
          (notification) =>
            notification.notification_id ===
            (action.payload[action.type.changeType] as Notification).notification_id,
        )
      ) {
        return {
          ...notifications,
          bookmarks: notifications.bookmarks.filter(
            (item) =>
              item.notification_id !==
              (action.payload[action.type.changeType] as Notification).notification_id,
          ),
        };
      } else {
        return {
          ...notifications,
          bookmarks: [
            ...notifications.bookmarks,
            action.payload[action.type.changeType] as Notification,
          ],
        };
      }
    case 'contract':
      if (
        notifications.contracts.some(
          (notification) =>
            notification.notification_id ===
            (action.payload[action.type.changeType] as Notification).notification_id,
        )
      ) {
        return {
          ...notifications,
          contracts: notifications.contracts.filter(
            (item) =>
              item.notification_id !==
              (action.payload[action.type.changeType] as Notification).notification_id,
          ),
        };
      } else {
        return {
          ...notifications,
          contracts: [
            ...notifications.contracts,
            action.payload[action.type.changeType] as Notification,
          ],
        };
      }
    default:
      return notifications;
  }
};

export const NotificationContext = createContext<NotificationContextType>(initialValue);

export const NotificationProvider = ({
  children,
  initialNotifications,
}: PropsWithChildren<NotificationProviderProps>) => {
  const { buddy } = useAuth();
  const modal = useModal();

  const {
    data: notificationsFromQuery,
    isPending: isPendingNotification,
    error,
  } = useNotificationQuery();

  const initial = notificationsFromQuery || initialNotifications;

  const [notifications, dispatch] = useReducer(reducer, {
    storyLikes: initial?.filter((notification) => notification.notification_type === 'like') || [],
    follows: initial?.filter((notification) => notification.notification_type === 'follow') || [],
    bookmarks:
      initial?.filter((notification) => notification.notification_type === 'bookmark') || [],
    contracts:
      initial?.filter((notification) => notification.notification_type === 'contract') || [],
  });

  const [hasNotification, setHasNotification] = useState(false);
  const prevNotificationsRef = useRef(notifications);
  const hasFetchedOnceRef = useRef(false);

  const queries = useContractQueries(
    notifications.contracts
      .map((notification) => notification.notification_origin_id)
      .filter((id): id is string => id !== null),
  );

  const handleRealTimeNotificationInsert = useCallback(
    (payload: RealtimePostgresInsertPayload<Notification>) => {
      if (
        payload.new.notification_receiver === buddy?.buddy_id &&
        payload.new.notification_sender !== buddy?.buddy_id
      ) {
        dispatch({
          type: {
            changeType: 'new',
            ActionType: payload.new.notification_type as ActionType,
          },
          payload,
        });
      }
    },
    [buddy],
  );

  const handleRealTimeNotificationUpdate = useCallback(
    (payload: RealtimePostgresUpdatePayload<Notification>) => {
      if (
        payload.new.notification_receiver === buddy?.buddy_id &&
        payload.new.notification_sender !== buddy?.buddy_id
      ) {
        dispatch({
          type: {
            changeType: 'new',
            ActionType: payload.new.notification_type as ActionType,
          },
          payload,
        });
      }
    },
    [buddy],
  );
  const handleRealTimeNotificationDelete = useCallback(
    (payload: RealtimePostgresDeletePayload<Notification>) => {
      if (payload.old.notification_receiver === buddy?.buddy_id) {
        dispatch({
          type: {
            changeType: 'old',
            ActionType: payload.old.notification_type as ActionType,
          },
          payload,
        });
      }
    },
    [buddy],
  );

  useEffect(() => {
    const allChanges = supabase
      .channel('schema-db-changes')
      .on<Notification>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          if (!payload.new.notification_isRead) {
            handleRealTimeNotificationInsert(payload);
          }
        },
      )
      .on<Notification>(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          if (!payload.old.notification_isRead) {
            handleRealTimeNotificationDelete(payload);
          }
        },
      )
      .on<Notification>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          // filter: `notification_isRead=eq.false`,
        },
        (payload) => {
          if (!payload.new.notification_isRead) {
            handleRealTimeNotificationUpdate(payload);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(allChanges);
    };
  }, [
    buddy,
    handleRealTimeNotificationDelete,
    handleRealTimeNotificationInsert,
    handleRealTimeNotificationUpdate,
  ]);

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
