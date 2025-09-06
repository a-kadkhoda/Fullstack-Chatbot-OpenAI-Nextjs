import PromptInput from "@/features/promptInput/components/PromptInput";
import React from "react";

const Chat = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center transition-all duration-300">
      <PromptInput />
    </div>
  );
};

export default Chat;
