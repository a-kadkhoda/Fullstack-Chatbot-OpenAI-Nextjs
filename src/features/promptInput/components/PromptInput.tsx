"use client";

import TextArea from "@/features/textArea/components/TextArea";
import { useChat } from "@/queries/chat";
import { Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const PromptInput: React.FC = ({}) => {
  const { push } = useRouter();
  const { mutate: Chat } = useChat({
    onSuccess(data) {
      push(`/chat/${data.data.conversationId}`);
    },
  });
  const { id } = useParams();
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div className=" relative w-full md:w-3/4 flex items-center overflow-hidden bg-default-100 rounded-xl shadow-md shadow-primary-200">
      <TextArea
        minRows={4}
        maxRows={8}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="w-[calc(100%-80px)] p-4 outline-0 resize-none text-xl"
      />
      <div
        onClick={() => {
          if (prompt) {
            Chat({ prompt: prompt.trim(), conversationId: id as string });
          }
        }}
        className=" absolute right-0 w-20 h-full flex justify-center items-center  transition-colors duration-300 hover:bg-secondary-200 cursor-pointer"
      >
        <Send size={20} />
      </div>
    </div>
  );
};

export default PromptInput;
