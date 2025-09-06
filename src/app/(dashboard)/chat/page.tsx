import MessageField from "@/features/messageField/components/MessageField";
import PromptInput from "@/features/promptInput/components/PromptInput";
import { ScrollShadow } from "@heroui/scroll-shadow";
import React from "react";

const Chat = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center transition-all duration-300 gap-4">
      <ScrollShadow className="w-full flex-1" size={100}>
        <div className=" overflow-y-auto py-4">
          <MessageField />
        </div>
      </ScrollShadow>
      <PromptInput />
    </div>
  );
};

export default Chat;
