"use client";

import Loading from "@app/loading";
import React, { useEffect, useState } from "react";
import BuddyProfile from "@/components/molecules/profile/BuddyProfile";
import { useModal } from "@/contexts/modal.context";
import {
  useContractMutation,
  useContractQueries,
  useNotificationMutation,
  useSpecificBuddyQuery,
} from "@/hooks/queries";
import { Notification } from "@/types/Notification.types";
import { showAlert } from "@/utils/ui/openCustomAlert";

type ContractModalProps = {
  unreadContracts: Notification[];
  mode?: "default" | "notification";
  notifications: Notification[];
};

const ContractModal: React.FC<ContractModalProps> = ({
  unreadContracts,
  mode,
  notifications,
}) => {
  const [index, setIndex] = useState(0);
  const modal = useModal();

  const { data: specificBuddy } = useSpecificBuddyQuery(
    unreadContracts[index].notification_sender,
  );

  const tripIds = notifications
    .map((notification) => notification.notification_origin_id)
    .filter((id): id is string => id !== null);

  const queries = useContractQueries(tripIds);

  const { mutate: mutateNotification, error: notificationError } =
    useNotificationMutation();
  const { mutate: mutateContract, error: contractError } =
    useContractMutation();

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
      // console.log('queries[index].data ====>', queries[index].data);

      const currentContracts = queries[index].data?.contracts.filter(
        (contract) =>
          contract.contract_trip_id ===
            notifications[index].notification_origin_id &&
          contract.contract_isPending,
      );

      // console.log('currentContracts ====>', currentContracts);

      currentContracts?.sort(
        (a, b) =>
          new Date(b.contract_created_at).getTime() -
          new Date(a.contract_created_at).getTime(),
      );

      if (currentContracts && currentContracts.length > 0) {
        currentContracts[index].contract_isPending = false;
        currentContracts[index].contract_validate_date =
          new Date().toISOString();
        mutateContract(currentContracts[index]);
      }
      const newNotification = notifications[index];
      newNotification.notification_isRead = true;
      // console.log('newNotification ====>', newNotification);

      mutateNotification(newNotification);
      // console.log('index ====>', index);
      if (index < notifications.length - 1) setIndex((prev) => prev + 1);
      if (index === notifications.length - 1) modal.closeModal();
    } catch (error: any) {
      showAlert("error", error.message);
    }
  };

  useEffect(() => {
    queries.forEach((query) => {
      if (query.error) console.error(query.error);
    });
  }, [queries]);

  useEffect(() => {
    if (notificationError || contractError) {
      const errorMessage = notificationError
        ? notificationError.message
        : contractError?.message;
      showAlert("error", errorMessage || "오류가 발생했습니다.");
    }
  }, [notificationError, contractError]);

  useEffect(() => {
    if (!modal) return;
    if (index !== 0 && index === notifications.length - 1) {
      modal.closeModal();
    }
  }, [index, notifications, modal]);

  if (!specificBuddy) return null;
  if (queries[index].isPending) return <Loading />;

  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-full w-full items-center justify-center bg-black/60">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="relative flex w-full flex-col items-center justify-center gap-2">
          <div className="rounded-md bg-white px-3 py-1 font-bold">
            NEW BUDDIES
          </div>
          <p className="text-center font-bold text-white text-xl">
            {notifications[index]?.notification_content}
          </p>
        </div>

        <dialog open className="relative z-50 rounded-2xl">
          <div className="flex max-h-[250px] min-h-[250px] w-full flex-col items-center justify-center gap-3 rounded-lg bg-white py-2 transition-all duration-300 xl:max-h-[300px] xl:min-h-[300px]">
            <div className="flex w-full flex-col items-center gap-2">
              <BuddyProfile
                clickedBuddy={specificBuddy}
                loading={false}
                mode={mode}
                className="xl:mt-0"
              />

              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  // className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md focus-visible:outline-none"
                  className="w-[48%] rounded-xl border border-primary-color-400 bg-white px-8 py-2 text-primary-color-400"
                  onClick={handleCancel}
                >
                  거절하기
                </button>

                <button
                  type="button"
                  className="w-[48%] rounded-xl border border-primary-color-400 bg-primary-color-400 px-8 py-2 text-white"
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
