'use client';
import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import ChatListItem from '@/components/molecules/chatpage/ChatListItem';
import { useUnreadMessagesContext } from '@/contexts/unreadMessages.context';
import { useAuth } from '@/hooks';
import { Buddy } from '@/types/Auth.types';
import { ContractData } from '@/types/Chat.types';
import { getTimeIfDateIsToday } from '@/utils/common/getTimeIfDateIsToday';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import supabase from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ChatList = () => {
  const { buddy } = useAuth();
  const currentBuddy = buddy as Buddy;
  const [chatData, setChatData] = useState<ContractData[]>([]);
  const [contractsExist, setContractsExist] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { contractUnreadCounts, fetchUnreadCounts } = useUnreadMessagesContext();

  useEffect(() => {
    const fetchChatData = async () => {
      if (!currentBuddy) return;

      try {
        const { data: contracts, error: contractsError } = await supabase
          .from('contract')
          .select(
            'contract_id, contract_trip_id, contract_last_message_read, contract_validate_date',
          )
          .eq('contract_buddy_id', currentBuddy.buddy_id)
          .eq('contract_isValidate', true);

        if (contractsError) throw contractsError;

        if (!contracts || contracts.length === 0) {
          setContractsExist(false);
          setIsLoading(false);
          return;
        }

        const tripIds = contracts.map((contract) => contract.contract_trip_id);

        const { data: allBuddies, error: allBuddiesError } = await supabase
          .from('contract')
          .select('contract_buddy_id, contract_trip_id')
          .in('contract_trip_id', tripIds);

        if (allBuddiesError) throw allBuddiesError;

        const buddiesByTrip = allBuddies.reduce(
          (acc, buddy) => {
            if (!acc[buddy.contract_trip_id]) {
              acc[buddy.contract_trip_id] = new Set();
            }
            acc[buddy.contract_trip_id].add(buddy.contract_buddy_id);
            return acc;
          },
          {} as Record<string, Set<string>>,
        );

        const allBuddyIds = Array.from(new Set(allBuddies.map((buddy) => buddy.contract_buddy_id)));

        const { data: buddyProfiles, error: buddyError } = await supabase
          .from('buddies')
          .select('buddy_id, buddy_profile_pic')
          .in('buddy_id', allBuddyIds);

        if (buddyError) throw buddyError;

        const buddyProfileMap = buddyProfiles?.reduce(
          (acc, profile) => {
            acc[profile.buddy_id] = profile.buddy_profile_pic;
            return acc;
          },
          {} as Record<string, string>,
        );

        const { data: trips, error: tripError } = await supabase
          .from('trips')
          .select('trip_id, trip_title')
          .in('trip_id', tripIds);

        if (tripError) throw tripError;

        const tripTitleMap = trips?.reduce(
          (acc, trip) => {
            acc[trip.trip_id] = trip.trip_title;
            return acc;
          },
          {} as Record<string, string>,
        );

        const contractDataMap = new Map<string, ContractData>();

        contracts.forEach((contract) => {
          const { contract_id, contract_trip_id, contract_validate_date } = contract;
          const buddyIds = Array.from(buddiesByTrip[contract_trip_id] || []);
          const buddyProfiles = buddyIds.map((buddyId) => buddyProfileMap[buddyId] || '');

          contractDataMap.set(contract_id, {
            contract_id,
            contract_trip_id,
            trip_title: tripTitleMap[contract_trip_id] || '',
            contract_buddies_profiles: buddyProfiles,
            last_message_content: '',
            last_message_time: '',
            unread_count: contractUnreadCounts[contract_trip_id] || 0,
            validate_date: contract_validate_date,
          });
        });

        const fetchLastMessages = async () => {
          const lastMessagesMap = new Map<
            string,
            { message_content: string; message_created_at: string }
          >();

          for (const tripId of tripIds) {
            const { validate_date } =
              Array.from(contractDataMap.values()).find((c) => c.contract_trip_id === tripId) || {};

            const query = supabase
              .from('messages')
              .select('message_content, message_created_at')
              .eq('message_trip_id', tripId)
              .order('message_created_at', { ascending: false })
              .limit(1);

            if (validate_date) {
              query.gt('message_created_at', validate_date);
            }

            const { data: lastMessages, error: lastMessagesError } = await query;

            if (lastMessagesError) {
              console.error('Error fetching last messages:', lastMessagesError);
              continue;
            }

            if (lastMessages?.length > 0) {
              lastMessagesMap.set(tripId, {
                message_content: lastMessages[0].message_content,
                message_created_at: lastMessages[0].message_created_at,
              });
            }
          }

          lastMessagesMap.forEach((message, tripId) => {
            const contractData = Array.from(contractDataMap.values()).find(
              (c) => c.contract_trip_id === tripId,
            );
            if (contractData) {
              contractData.last_message_content = message.message_content;
              contractData.last_message_time = message.message_created_at;
            }
          });

          setChatData(
            Array.from(contractDataMap.values()).sort((a, b) => {
              const dateA = new Date(a.last_message_time || '1970-01-01T00:00:00Z').getTime();
              const dateB = new Date(b.last_message_time || '1970-01-01T00:00:00Z').getTime();
              return dateB - dateA;
            }),
          );
        };

        await fetchLastMessages();

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chat data:', error);
        setIsLoading(false);
      }
    };

    fetchChatData();
  }, [currentBuddy, contractUnreadCounts]);

  useEffect(() => {
    fetchUnreadCounts();
  }, [fetchUnreadCounts]);

  if (isLoading) {
    return <DefaultLoader />;
  } else if (!contractsExist) {
    return (
      <div className="bg-white xl:bg-grayscale-color-50 text-center h-[calc(100vh-57px-54px)] xl:h-[calc(100vh-100px-57px)] font-bold text-lg flex flex-col justify-center text-grayscale-color-600 overflow-y-auto scrollbar-hidden">
        <h1 className="text-2xl">아직 참여한 여정이 없습니다!</h1>
        <br />
        <Link href="/trips" className="text-center font-bold text-xl hover:text-primary-color-400">
          <h2>트립버디즈와 함께</h2>
          <h2>즐거운 여행을 시작해 볼까요?</h2>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="bg-white xl:bg-grayscale-color-50 h-[calc(100vh-57px-54px)] xl:h-[calc(100vh-100px-57px)] flex flex-col p-4 xl:w-full overflow-y-auto scrollbar-hidden">
        {chatData.map((chat) => {
          const lastMessageTime = chat.last_message_time
            ? getTimeIfDateIsToday(chat.last_message_time) ||
              getTimeSinceUpload(chat.last_message_time)
            : '';

          return (
            <ChatListItem
              key={chat.contract_id}
              contract_id={chat.contract_id}
              contract_trip_id={chat.contract_trip_id}
              trip_title={chat.trip_title}
              contract_buddies_profiles={chat.contract_buddies_profiles}
              last_message_content={chat.last_message_content}
              last_message_time={lastMessageTime}
            />
          );
        })}
      </div>
    );
  }
};

export default ChatList;
