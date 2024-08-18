'use client';

import { useAuth } from '@/hooks';
import {
    ClassifiedNotification,
    Notification,
    NotificationContextType,
} from '@/types/Notification.types';
import supabase from '@/utils/supabase/client';
import {
    RealtimePostgresDeletePayload,
    RealtimePostgresInsertPayload,
} from '@supabase/supabase-js';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useModal } from './modal.context';
import ContractModal from '@/components/organisms/contract/ContractModal';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { Buddy } from '@/types/Auth.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useContractQueries } from '@/hooks/queries';

type NotificationProviderProps = {
    initialNotifications: Notification[] | undefined;
};

const initialValue: NotificationContextType = {
    notifications: [],
    hasNotification: false,
};

export const NotificationContext =
    createContext<NotificationContextType>(initialValue);

export const NotificationProvider = ({
    children,
    initialNotifications,
}: PropsWithChildren<NotificationProviderProps>) => {
    const [notifications, setNotifications] = useState<ClassifiedNotification>(
        {
            storyLikes:
                initialNotifications?.filter(
                    notification =>
                        notification.notification_type === 'like' &&
                        notification.notification_isRead === false,
                ) || [],
            follows:
                initialNotifications?.filter(
                    notification =>
                        notification.notification_type === 'follow' &&
                        notification.notification_isRead === false,
                ) || [],
            bookmarks:
                initialNotifications?.filter(
                    notification =>
                        notification.notification_type === 'bookmark' &&
                        notification.notification_isRead === false,
                ) || [],
            contracts:
                initialNotifications?.filter(
                    notification =>
                        notification.notification_type === 'contract' &&
                        notification.notification_isRead === false,
                ) || [],
        } || [],
    );

    const { buddy } = useAuth();
    const modal = useModal();
    const prevNotificationsRef = useRef(notifications);
    const hasFetchedOnceRef = useRef(false);
    const [hasNotification, setHasNotification] = useState(false);

    useEffect(() => {
        const hasUnreadNotifications =
            notifications.storyLikes.length > 0 ||
            notifications.follows.length > 0 ||
            notifications.bookmarks.length > 0 ||
            notifications.contracts.length > 0;

        setHasNotification(hasUnreadNotifications);
    }, [notifications]);

    const queries = useContractQueries(
        notifications.contracts
            .map(notification => notification.notification_origin_id)
            .filter((id): id is string => id !== null),
    );

    const handleRealTimePostsUpdate = useCallback(
        (payload: RealtimePostgresInsertPayload<Notification>) => {
            if (payload.new.notification_receiver === buddy?.buddy_id) {
                if (payload.new.notification_type === 'like') {
                    setNotifications(prev => ({
                        ...prev,
                        storyLikes: [...prev.storyLikes, payload.new],
                    }));
                }
                if (payload.new.notification_type === 'follow') {
                    setNotifications(prev => ({
                        ...prev,
                        follows: [...prev.follows, payload.new],
                    }));
                }
                if (payload.new.notification_type === 'bookmark') {
                    setNotifications(prev => ({
                        ...prev,
                        bookmarks: [...prev.bookmarks, payload.new],
                    }));
                }
                if (payload.new.notification_type === 'contract') {
                    setNotifications(prev => ({
                        ...prev,
                        contracts: [...prev.contracts, payload.new],
                    }));
                }
            }
        },
        [buddy],
    );

    const handleRealTimePostsDelete = useCallback(
        (payload: RealtimePostgresDeletePayload<Notification>) => {
            const notification = notifications.storyLikes.find(
                notification =>
                    notification.notification_id ===
                    payload.old.notification_id,
            );

            const followNotification = notifications.follows.find(
                notification =>
                    notification.notification_id ===
                    payload.old.notification_id,
            );
            const bookmarkNotification = notifications.bookmarks.find(
                notification =>
                    notification.notification_id ===
                    payload.old.notification_id,
            );
            const contractNotification = notifications.contracts.find(
                notification =>
                    notification.notification_id ===
                    payload.old.notification_id,
            );

            if (notification) {
                setNotifications(prev => ({
                    ...prev,
                    storyLikes: prev.storyLikes.filter(
                        item =>
                            item.notification_id !==
                            payload.old.notification_id,
                    ),
                }));
            }
            if (followNotification) {
                setNotifications(prev => ({
                    ...prev,
                    follows: prev.follows.filter(
                        item =>
                            item.notification_id !==
                            payload.old.notification_id,
                    ),
                }));
            }
            if (bookmarkNotification) {
                setNotifications(prev => ({
                    ...prev,
                    bookmarks: prev.bookmarks.filter(
                        item =>
                            item.notification_id !==
                            payload.old.notification_id,
                    ),
                }));
            }
            if (contractNotification) {
                setNotifications(prev => ({
                    ...prev,
                    contracts: prev.contracts.filter(
                        item =>
                            item.notification_id !==
                            payload.old.notification_id,
                    ),
                }));
            }
        },
        [notifications],
    );

    useEffect(() => {
        const allChanges = supabase
            .channel('realtime-posts')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `notification_isRead=eq.false`,
                },
                handleRealTimePostsUpdate,
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'notifications',
                    filter: `notification_isRead=eq.false`,
                },
                handleRealTimePostsDelete,
            )
            .subscribe();

        return () => {
            supabase.removeChannel(allChanges);
        };
    }, [buddy, handleRealTimePostsDelete, handleRealTimePostsUpdate]);

    const isPending = queries.some(query => query.isPending);

    useEffect(() => {
        if (isPending) return;
        if (queries.length === 0) return;

        const prevNotifications = prevNotificationsRef.current;
        async function fetchSpecificBuddy() {
            const promises = notifications.contracts.map(async notification => {
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
            prevNotifications.contracts.length !==
                notifications.contracts.length ||
            JSON.stringify(prevNotifications.contracts) !==
                JSON.stringify(notifications.contracts)
        ) {
            prevNotificationsRef.current = notifications;
            hasFetchedOnceRef.current = true; // 최초 실행 여부를 기록

            if (!modal) return;

            fetchSpecificBuddy()
                .then(data => {
                    if (data.length > 0) {
                        showAlert(
                            'caution',
                            `새로운 참여 요청이 ${data.length}건 있습니다.`,
                            {
                                onConfirm: () => {
                                    modal.openModal({
                                        component: () => (
                                            <ContractModal
                                                queries={queries}
                                                notifications={
                                                    notifications.contracts
                                                }
                                                buddies={data}
                                                mode="notification"
                                            />
                                        ),
                                    });
                                },
                            },
                        );
                    }
                })
                .catch(error => {
                    console.error('error ====>', error);
                });

            console.log('notifications 상태 변경 ====>', notifications);
        }
    }, [modal, queries, notifications, isPending]);

    return (
        <NotificationContext.Provider
            value={{ notifications, hasNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
