import Image from "next/image";
import Link from "next/link";
import React from "react";
import UnreadMessages from "@/components/atoms/chatpage/UnreadMessages";
import { useUnreadMessagesContext } from "@/contexts/unreadMessages.context";
import { ContractData } from "@/types/Chat.types";

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
        className={`flex h-[23px] w-[23px] justify-center overflow-hidden rounded-full border-1 border-white bg-[#d9d9d9] ${index === 1 || index === 3 ? "ml-[-5px]" : ""} ${index === 3 || index === 4 ? "mt-[-5px]" : ""}`}
      >
        {profilePic && (
          <Image
            src={profilePic}
            alt="Profile"
            width={23}
            height={23}
            className="h-auto w-auto object-cover"
          />
        )}
      </div>
    ));
  };

  return (
    <Link href={`/chat/${contract_trip_id}`}>
      <div className="flex items-center justify-between border-grayscale-color-50 border-b p-2 hover:bg-grayscale-color-70">
        <div className="flex w-[45px] flex-wrap items-center justify-center">
          {renderProfilePictures()}
        </div>
        <div className="flex flex-grow flex-col pl-2">
          <p className="font-bold text-[16px] text-grayscale-color-800">
            {trip_title}
          </p>
          <p className="font-medium text-[14px] text-grayscale-color-500">
            {last_message_content || "채팅을 시작해보세요"}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-center font-medium text-[14px] text-grayscale-color-600">
            {last_message_time}
          </span>
          {unread_count > 0 && <UnreadMessages unread_count={unread_count} />}
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
