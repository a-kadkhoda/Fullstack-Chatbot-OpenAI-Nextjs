"use client";
import PromptInput from "@/features/promptInput/components/PromptInput";
import React from "react";

const Chat = () => {
  return (
    <div
      className={`  size-full px-6 md:px-0 flex flex-col items-center justify-center transition-all duration-300 gap-2  ease-in-out `}
    >
      <PromptInput />
    </div>
  );
};

export default Chat;
