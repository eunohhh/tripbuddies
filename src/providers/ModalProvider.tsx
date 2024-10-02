'use client';

import { useModal } from '@/contexts/modal.context';
import { setModalContext } from '@/utils/ui/openCustomAlert';
import React, { useEffect } from 'react';

export const ModalProviderSetter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modal = useModal();

  useEffect(() => {
    setModalContext(modal);
  }, [modal]);

  return <>{children}</>;
};
