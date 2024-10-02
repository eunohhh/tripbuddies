import React from 'react';

type UnreadMessagesProps = {
  unread_count?: number;
};

const UnreadMessages: React.FC<UnreadMessagesProps> = ({ unread_count }) => {
  return (
    <span className="text-center text-[12px] font-semibold text-white bg-secondary-color-300 rounded-[40px] px-[7px] py-[4px]">
      {unread_count}
    </span>
  );
};

export default UnreadMessages;
