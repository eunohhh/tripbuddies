"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DefaultLoader from "@/components/atoms/common/DefaultLoader";
import ChatMessageList from "@/components/molecules/chatpage/ChatMessageList";
import ChatMessageSend from "@/components/molecules/chatpage/ChatMessageSend";
import ChattingTitle from "@/components/molecules/chatpage/ChattingTitle";
import { useAuth } from "@/hooks";
import { Buddy } from "@/types/Auth.types";
import supabase from "@/utils/supabase/client";

const ChattingPage = () => {
  const { buddy } = useAuth();
  const currentBuddy = buddy as Buddy;
  const params = useParams();
  const { id } = params as { id: string };

  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      try {
        const { data: contractData, error: contractError } = await supabase
          .from("contract")
          .select("contract_id")
          .eq("contract_trip_id", id)
          .eq("contract_buddy_id", currentBuddy?.buddy_id)
          .maybeSingle();

        if (contractError) {
          console.error("Error checking access:", contractError);
          setHasAccess(false);
        } else if (contractData) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Error checking access:", error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [id, currentBuddy]);

  if (isLoading) {
    return <DefaultLoader />;
  }

  return (
    <div className="relative bg-white xl:w-2/3 xl:bg-grayscale-color-50">
      {!hasAccess ? (
        <h1 className="p-4 text-center font-grayscale-color-700 font-semibold text-16">
          해당 여정의 참여자가 아닙니다!
        </h1>
      ) : (
        <>
          <ChattingTitle id={id} />
          <ChatMessageList currentBuddy={currentBuddy} id={id} />
          <ChatMessageSend currentBuddy={currentBuddy} id={id} />
        </>
      )}
    </div>
  );
};

export default ChattingPage;
