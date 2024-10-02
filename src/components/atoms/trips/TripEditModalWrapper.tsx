'use client';

import MobileHeader from '@/components/molecules/common/MobileHeader';
import { useModal } from '@/contexts/modal.context';
import React from 'react';
import Close from '../../../../public/svg/Close.svg';

type TripEditModalWrapperProps = {
  children: React.ReactNode;
};

const TripEditModalWrapper: React.FC<TripEditModalWrapperProps> = ({ children }) => {
  const modal = useModal();

  const handleClose = () => modal.closeModal();

  return (
    <div className="fixed top-0 left-0 w-dvw h-dvh z-[60]">
      <div className="hidden xl:flex absolute top-0 left-0 w-full z-[60] bg-white flex-col justify-center items-end p-2">
        <Close className="relative cursor-pointer fill-black" onClick={handleClose} />
      </div>
      <MobileHeader />
      <div className="relative top-0 left-0 w-dvw h-[calc(100dvh-57px-54px)] xl:h-dvh z-50 bg-white flex flex-col justify-center items-start">
        {children}
      </div>
    </div>
  );
};

export default TripEditModalWrapper;
