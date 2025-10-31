"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useUnreadMessagesContext } from "@/contexts/unreadMessages.context";
import type { Buddy } from "@/types/Auth.types";
import type { Message } from "@/types/Chat.types";
import supabase from "@/utils/supabase/client";

type ChatMessageListProps = {
  currentBuddy: Buddy;
  id: string;
};

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  currentBuddy,
  id,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    (Message & {
      buddy: { buddy_profile_pic: string; buddy_nickname: string };
    })[]
  >([]);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const { fetchUnreadCounts } = useUnreadMessagesContext();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: contractData, error: contractError } = await supabase
          .from("contract")
          .select("contract_validate_date")
          .eq("contract_trip_id", id)
          .eq("contract_buddy_id", currentBuddy?.buddy_id)
          .single();

        if (contractError) {
          console.error("Error fetching contract data:", contractError);
          return;
        }

        const validateDate = contractData?.contract_validate_date;

        let query = supabase
          .from("messages")
          .select(
            `
                        *,
                        buddy:message_sender_id (
                            buddy_profile_pic,
                            buddy_nickname
                        )
                    `,
          )
          .eq("message_trip_id", id)
          .order("message_created_at", { ascending: true });

        if (validateDate !== null) {
          query = query.gt("message_created_at", validateDate);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching messages:", error);
        } else {
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`realtime:messages:trip_${id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMessage = payload.new as Message;

          const { data: buddyData, error: senderError } = await supabase
            .from("buddies")
            .select("buddy_profile_pic, buddy_nickname")
            .eq("buddy_id", newMessage.message_sender_id)
            .single();

          if (senderError) {
            console.error("Error fetching sender info:", senderError);
            return;
          }

          const newMessageWithBuddy = {
            ...newMessage,
            buddy: buddyData,
          };

          if (newMessage.message_trip_id === id) {
            setMessages((prevMessages) => [
              ...prevMessages,
              newMessageWithBuddy,
            ]);

            if (isPageVisible) {
              const { data: contracts, error: contractsError } = await supabase
                .from("contract")
                .select("contract_id")
                .eq("contract_trip_id", id)
                .eq("contract_buddy_id", currentBuddy?.buddy_id);

              if (contractsError) {
                console.error("Error fetching contracts:", contractsError);
                return;
              }

              const updates = contracts.map((contract) =>
                supabase
                  .from("contract")
                  .update({
                    contract_last_message_read: newMessage.message_id,
                  })
                  .eq("contract_id", contract.contract_id),
              );

              await Promise.all(updates);
            }
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [id, currentBuddy, isPageVisible]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleReadMessages = async () => {
      if (messages.length > 0 && isPageVisible) {
        const lastMessageId = messages[messages.length - 1].message_id;
        const { data, error } = await supabase
          .from("contract")
          .update({ contract_last_message_read: lastMessageId })
          .eq("contract_trip_id", id)
          .eq("contract_buddy_id", currentBuddy?.buddy_id);

        if (error) {
          console.error("Error updating last message read:", error);
        }
      }
    };

    handleReadMessages();
  }, [messages, currentBuddy, id, isPageVisible]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, []);

  useEffect(() => {
    fetchUnreadCounts();
  }, [fetchUnreadCounts]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  return (
    <div
      className="scrollbar-hidden h-[calc(100vh-57px-54px)] overflow-y-auto px-6 pt-4 pb-12 xl:h-[calc(100vh-100px-57px)]"
      ref={scrollRef}
    >
      {messages.map((message, index) => {
        const isCurrentUser =
          message.message_sender_id === currentBuddy?.buddy_id;

        const currentMessageDate = new Date(message.message_created_at);
        const previousMessageDate =
          index > 0 ? new Date(messages[index - 1].message_created_at) : null;

        const showDate =
          !previousMessageDate ||
          currentMessageDate.toDateString() !==
            previousMessageDate.toDateString();

        return (
          <div key={message.message_id}>
            {showDate && (
              <div className="my-2 flex w-full justify-center">
                <p className="w-fit rounded-[4px] bg-secondary-color-300 px-[8px] py-[2px] font-medium text-[12px] text-white">
                  {formatDate(message.message_created_at)}
                </p>
              </div>
            )}
            <div
              className={`flex py-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              {!isCurrentUser && (
                <Link
                  href={`/profile/${message.message_sender_id}`}
                  className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-grayscale-color-300"
                >
                  <Image
                    src={message.buddy?.buddy_profile_pic}
                    alt="Profile Image"
                    width={40}
                    height={40}
                    className="h-auto w-auto object-cover"
                  />
                </Link>
              )}
              <div
                className={`flex items-end p-2 pt-4 ${isCurrentUser ? "flex-row-reverse" : ""}`}
              >
                <div>
                  {!isCurrentUser && (
                    <p className="font-bold text-[14px] text-grayscale-color-700">
                      {message.buddy?.buddy_nickname}
                    </p>
                  )}
                  <p
                    className={`inline-block rounded-2xl p-4 font-semibold text-[12px] text-grayscale-color-800 ${
                      isCurrentUser
                        ? "rounded-tr-none bg-primary-color-300"
                        : "rounded-tl-none bg-grayscale-color-85"
                    }`}
                  >
                    {message.message_content}
                  </p>
                </div>

                <span className="mt-1 px-1 font-medium text-[12px] text-grayscale-color-700">
                  {new Date(message.message_created_at).toLocaleTimeString(
                    "en-GB",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
