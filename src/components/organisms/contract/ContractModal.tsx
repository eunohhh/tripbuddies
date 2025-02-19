'use client';

import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useModal } from '@/contexts/modal.context';
import {
  useContractMutation,
  useContractQueries,
  useNotificationMutation,
  useSpecificBuddyQuery,
} from '@/hooks/queries';
import { Notification } from '@/types/Notification.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { useEffect, useState } from 'react';

type ContractModalProps = {
  unreadContracts: Notification[];
  mode?: 'default' | 'notification';
  notifications: Notification[];
  queries: ReturnType<typeof useContractQueries>;
};

const ContractModal: React.FC<ContractModalProps> = ({
  unreadContracts,
  mode,
  queries,
  notifications,
}) => {
  const [index, setIndex] = useState(0);
  const modal = useModal();

  const { data: specificBuddy } = useSpecificBuddyQuery(unreadContracts[index].notification_sender);

  // console.log('queries ====>', queries);

  const { mutate: mutateNotification, error: notificationError } = useNotificationMutation();
  const { mutate: mutateContract, error: contractError } = useContractMutation();

  const handleCancel = () => {
    // 컨트랙트 isPending 을 true로 그대로 두고
    // 노티피케이션 isRead 를 true로 변경
    const newNotification = notifications[index];
    newNotification.notification_isRead = true;
    mutateNotification(newNotification);
    if (index < notifications.length - 1) setIndex((prev) => prev + 1);
    if (index === notifications.length - 1) modal.closeModal();
  };

  const handleOk = () => {
    // 컨트랙트 isPending 을 false로 변경
    // 노티피케이션 isRead 를 true로 변경

    try {
      const currentContracts = queries[index].data?.contracts.filter(
        (contract) =>
          contract.contract_trip_id === notifications[index].notification_origin_id &&
          contract.contract_isPending,
      );

      currentContracts?.sort(
        (a, b) =>
          new Date(b.contract_created_at).getTime() - new Date(a.contract_created_at).getTime(),
      );

      if (currentContracts) {
        currentContracts[index].contract_isPending = false;
        currentContracts[index].contract_validate_date = new Date().toISOString();
        mutateContract(currentContracts[index]);
      }
      const newNotification = notifications[index];
      newNotification.notification_isRead = true;
      // console.log('newNotification ====>', newNotification);

      mutateNotification(newNotification);
      if (index < notifications.length - 1) setIndex((prev) => prev + 1);
      if (index === notifications.length - 1) modal.closeModal();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  useEffect(() => {
    queries.forEach((query) => {
      if (query.error) console.error(query.error);
    });
  }, [queries]);

  useEffect(() => {
    if (notificationError || contractError) {
      const errorMessage = notificationError ? notificationError.message : contractError?.message;
      showAlert('error', errorMessage || '오류가 발생했습니다.');
    }
  }, [notificationError, contractError]);

  useEffect(() => {
    if (!modal) return;
    if (index !== 0 && index === notifications.length - 1) {
      modal.closeModal();
    }
  }, [index, notifications, modal]);

  if (!specificBuddy) return null;

  return (
    <div className="bg-black/60 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[9999]">
      <div className="flex flex-col justify-center items-center w-full gap-2">
        <div className="relative flex flex-col justify-center items-center w-full gap-2">
          <div className="bg-white rounded-md px-3 py-1 font-bold">NEW BUDDIES</div>
          <p className="text-xl font-bold text-white text-center">
            {notifications[index]?.notification_content}
          </p>
        </div>

        <dialog open className="relative rounded-2xl z-50">
          <div className="bg-white w-full min-h-[250px] max-h-[250px] xl:min-h-[300px] xl:max-h-[300px] py-2 rounded-lg flex flex-col justify-center items-center gap-3 transition-all duration-300">
            <div className="flex flex-col items-center gap-2 w-full">
              <BuddyProfile
                clickedBuddy={specificBuddy}
                loading={false}
                mode={mode}
                className="xl:mt-0"
              />

              <div className="flex flex-row gap-3">
                <button
                  // className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md focus-visible:outline-none"
                  className="bg-white text-primary-color-400 border-primary-color-400 rounded-xl border w-[48%] py-2 px-8"
                  onClick={handleCancel}
                >
                  거절하기
                </button>

                <button
                  className="bg-primary-color-400 text-white border-primary-color-400 rounded-xl border w-[48%] py-2 px-8"
                  onClick={handleOk}
                >
                  수락하기
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ContractModal;
