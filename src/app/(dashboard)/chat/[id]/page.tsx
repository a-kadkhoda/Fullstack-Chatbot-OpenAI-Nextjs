"use client";
import MessageField from "@/features/messageField/components/MessageField";
import PromptInput from "@/features/promptInput/components/PromptInput";
import { useAppStore } from "@/zustand/useAppStore";
import { ScrollShadow } from "@heroui/scroll-shadow";
import React, { useEffect } from "react";

const Conversation = () => {
  const setIsPromptInputBotton = useAppStore(
    (state) => state.setIsPromptInputBotton
  );
  useEffect(() => {
    setIsPromptInputBotton(true);
  }, [setIsPromptInputBotton]);

  return (
    <div
      className={`size-full flex flex-col items-center  transition-all duration-300 gap-2 pt-4  `}
    >
      <ScrollShadow
        className={`w-full transition-all duration-300 ease-in-out flex-1`}
        offset={100}
      >
        <div className=" overflow-y-auto p-4  ">
          <MessageField />
        </div>
      </ScrollShadow>
      <PromptInput />
    </div>
  );
};

export default Conversation;
