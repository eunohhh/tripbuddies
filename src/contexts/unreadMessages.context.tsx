'use client';
import { useAuth } from '@/hooks';
import { UnreadCount } from '@/types/UnreadCount.types';
import supabase from '@/utils/supabase/client';
import useChatStore from '@/zustand/chat.store';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type UnreadMessagesContextType = {
  contractUnreadCounts: Record<string, number>;
  allUnreadCounts: number;
  fetchUnreadCounts: () => void;
  setAllUnreadCounts: (count: number) => void;
};

const UnreadMessagesContext = createContext<UnreadMessagesContextType | undefined>(undefined);

export const UnreadMessagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { buddy: currentBuddy } = useAuth();
  const { setUnreadCount } = useChatStore();
  const [allUnreadCounts, setAllUnreadCounts] = useState<number>(0);
  const [contractUnreadCounts, setContractUnreadCounts] = useState<Record<string, number>>({});
  const fetchUnreadCounts = useCallback(async () => {
    if (!currentBuddy?.buddy_id) return;

    try {
      const { data, error } = await supabase.rpc('get_unread_counts', {
        current_buddy_id: currentBuddy.buddy_id,
      });

      if (error) {
        console.error('Error fetching unread counts:', error);
        return;
      }
      // console.log('data ====>', data);

      const unreadCounts: UnreadCount[] = data || [];
      let updatedUnreadCounts: Record<string, number> = {};
      unreadCounts.forEach(({ contract_trip_id, unread_count }) => {
        setUnreadCount(contract_trip_id, unread_count);
        updatedUnreadCounts[contract_trip_id] = unread_count;
      });

      // console.log('updatedUnreadCounts ====>', updatedUnreadCounts);
      setContractUnreadCounts(updatedUnreadCounts);

      const totalUnreadCount = Object.values(updatedUnreadCounts).reduce((a, b) => a + b, 0);
      setAllUnreadCounts(totalUnreadCount);
    } catch (error) {
      console.error('Error fetching unread counts:', error);
    }
  }, [currentBuddy, setUnreadCount]);

  useEffect(() => {
    fetchUnreadCounts();

    const messagesSubscription = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        // console.log('payload ====>', payload);
        fetchUnreadCounts();
      })
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'contract',
        },
        (payload) => {
          if (payload.new.contract_last_message_read !== payload.old.contract_last_message_read) {
            fetchUnreadCounts();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, [fetchUnreadCounts]);

  useEffect(() => {
    if (!currentBuddy) setAllUnreadCounts(0);
  }, [currentBuddy]);

  return (
    <UnreadMessagesContext.Provider
      value={{
        contractUnreadCounts,
        allUnreadCounts,
        fetchUnreadCounts,
        setAllUnreadCounts,
      }}
    >
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessagesContext = () => {
  const context = useContext(UnreadMessagesContext);
  if (context === undefined) {
    throw new Error('useUnreadMessagesContext must be used within an UnreadMessagesProvider');
  }
  return context;
};
