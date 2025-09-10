"use client";
import MessageField from "@/features/messageField/components/MessageField";
import PromptInput from "@/features/promptInput/components/PromptInput";
import { useGetMessages } from "@/queries/chat";
import { useAppStore } from "@/zustand/useAppStore";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Spinner } from "@heroui/spinner";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Conversation = () => {
  const { id } = useParams();

  const { data: fetchedMassages, isLoading } = useGetMessages(id as string);
  const setMessages = useAppStore((state) => state.setMessages);

  useEffect(() => {
    if (fetchedMassages) {
      setMessages(fetchedMassages.data);
    }
  }, [setMessages, fetchedMassages]);

  return (
    <div className={`size-full flex flex-col items-center gap-2 py-4`}>
      {isLoading ? (
        <Spinner color="secondary" size="lg" />
      ) : (
        <ScrollShadow className={`w-full flex-1`} offset={100}>
          <div className=" overflow-y-auto p-4  ">
            <MessageField />
          </div>
        </ScrollShadow>
      )}

      <PromptInput />
    </div>
  );
};

export default Conversation;
