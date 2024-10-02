'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import { useAuth } from '@/hooks';
import React, { useEffect } from 'react';

const LoadingPage: React.FC = () => {
  // useAuth 의 함수들은 모두 useCallback 처리함
  const { naverLogIn } = useAuth();

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      if (accessToken) naverLogIn();
    }
  }, [naverLogIn]);

  return <DefaultLoader />;
};

export default LoadingPage;
