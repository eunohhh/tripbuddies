import UnreadMessages from '@/components/atoms/chatpage/UnreadMessages';
import { useUnreadMessagesContext } from '@/contexts/unreadMessages.context';
import { ContractData } from '@/types/Chat.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChatListItem: React.FC<ContractData> = ({
  contract_trip_id,
  trip_title,
  contract_buddies_profiles = [],
  last_message_content,
  last_message_time,
}) => {
  // const unread_count = useChatStore(state =>
  //     state.getUnreadCount(contract_trip_id),
  // );

  const { contractUnreadCounts } = useUnreadMessagesContext();

  const unread_count = contractUnreadCounts[contract_trip_id];

  // console.log('unread_count ====>', unread_count);

  const renderProfilePictures = () => {
    return contract_buddies_profiles.map((profilePic, index) => (
      <div
        key={index}
        className={`rounded-full w-[23px] h-[23px] bg-[#d9d9d9] overflow-hidden flex justify-center border-1 border-white ${index === 1 || 3 ? 'ml-[-5px]' : ''} ${index === 3 || 4 ? 'mt-[-5px]' : ''}`}
      >
        {profilePic && (
          <Image
            src={profilePic}
            alt="Profile"
            width={23}
            height={23}
            className="object-cover w-auto h-auto"
          />
        )}
      </div>
    ));
  };

  return (
    <Link href={`/chat/${contract_trip_id}`}>
      <div className="flex justify-between items-center p-2 border-b border-grayscale-color-50 hover:bg-grayscale-color-70">
        <div className="w-[45px] flex items-center justify-center flex-wrap">
          {renderProfilePictures()}
        </div>
        <div className="flex flex-col flex-grow pl-2">
          <p className="text-[16px] font-bold text-grayscale-color-800">{trip_title}</p>
          <p className="text-[14px] font-medium text-grayscale-color-500">
            {last_message_content || '채팅을 시작해보세요'}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-center text-[14px] font-medium text-grayscale-color-600">
            {last_message_time}
          </span>
          {unread_count > 0 && <UnreadMessages unread_count={unread_count} />}
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
