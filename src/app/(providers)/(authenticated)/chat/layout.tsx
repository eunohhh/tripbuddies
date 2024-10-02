import ChatLayoutHeader from '@/components/molecules/chatpage/ChatLayoutHeader';
import ChatList from '@/components/organisms/chatpage/ChatList';
import { defaultMetaData } from '@/data/defaultMetaData';
import { Metadata } from 'next';
import React from 'react';

type ChatPageLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = defaultMetaData;

const ChatPageLayout: React.FC<ChatPageLayoutProps> = ({ children }) => {
  return (
    <div className="xl:flex xl:justify-center">
      <div className="hidden xl:block xl:w-1/3">
        <ChatLayoutHeader />
        <ChatList />
      </div>
      {children}
    </div>
  );
};

export default ChatPageLayout;
