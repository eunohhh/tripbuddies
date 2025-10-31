import React from "react";

type UnreadMessagesProps = {
  unread_count?: number;
};

const UnreadMessages: React.FC<UnreadMessagesProps> = ({ unread_count }) => {
  return (
    <span className="rounded-[40px] bg-secondary-color-300 px-[7px] py-[4px] text-center font-semibold text-[12px] text-white">
      {unread_count}
    </span>
  );
};

export default UnreadMessages;
