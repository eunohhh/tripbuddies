"use client";

import React from "react";
import MobileHeader from "@/components/molecules/common/MobileHeader";
import { useModal } from "@/contexts/modal.context";
import Close from "../../../../public/svg/Close.svg";

type TripEditModalWrapperProps = {
  children: React.ReactNode;
};

const TripEditModalWrapper: React.FC<TripEditModalWrapperProps> = ({
  children,
}) => {
  const modal = useModal();

  const handleClose = () => modal.closeModal();

  return (
    <div className="fixed top-0 left-0 z-[60] h-dvh w-dvw">
      <div className="absolute top-0 left-0 z-[60] hidden w-full flex-col items-end justify-center bg-white p-2 xl:flex">
        <Close
          className="relative cursor-pointer fill-black"
          onClick={handleClose}
        />
      </div>
      <MobileHeader />
      <div className="relative top-0 left-0 z-50 flex h-[calc(100dvh-57px-54px)] w-dvw flex-col items-start justify-center bg-white xl:h-dvh">
        {children}
      </div>
    </div>
  );
};

export default TripEditModalWrapper;
