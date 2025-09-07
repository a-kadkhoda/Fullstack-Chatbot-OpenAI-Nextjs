import MessageField from "@/features/messageField/components/MessageField";
import PromptInput from "@/features/promptInput/components/PromptInput";
import { ScrollShadow } from "@heroui/scroll-shadow";
import React from "react";

const Conversation = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center transition-all duration-300 gap-2">
      <ScrollShadow className="w-full flex-1 " offset={100}>
        <div className=" overflow-y-auto p-4  ">
          <MessageField />
        </div>
      </ScrollShadow>
      <PromptInput />
    </div>
  );
};

export default Conversation;
