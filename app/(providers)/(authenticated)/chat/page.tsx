'use client';

import ChatList from '@/components/organisms/chatpage/ChatList';
import { useEffect, useState } from 'react';

const ChatPage = () => {
  const [isXlScreen, setIsXlScreen] = useState(false);

  useEffect(() => {
    // 화면 크기 확인 및 상태 설정
    const handleResize = () => {
      setIsXlScreen(window.innerWidth >= 1280);
    };

    // 초기 실행 및 리사이즈 이벤트 설정
    handleResize();
    window.addEventListener('resize', handleResize);

    // 클린업 함수로 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {!isXlScreen && <ChatList />}
      {/* ChatList는 1280px 이상에서는 ChatPageLayout에서 렌더링됨 */}
    </div>
  );
};

export default ChatPage;
