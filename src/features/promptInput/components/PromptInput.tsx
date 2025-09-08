"use client";

import TextArea from "@/features/textArea/components/TextArea";
import { useChat } from "@/queries/chat";
import { useAppStore } from "@/zustand/useAppStore";
import { Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromptInput: React.FC = ({}) => {
  const setIsResponsePending = useAppStore(
    (state) => state.setIsResponsePending
  );
  const { push } = useRouter();
  const { mutate: Chat, isPending } = useChat({
    onSuccess(data) {
      push(`/chat/${data.data.conversationId}`);
    },
  });

  useEffect(() => {
    setIsResponsePending(isPending);
  }, [isPending, setIsResponsePending]);
  const { id } = useParams();
  const [prompt, setPrompt] = useState<string>("");
  const { setIsPromptInputBotton, isPromptInputBotton } = useAppStore();

  return (
    <div className=" h-48 w-full">
      <div
        className={`absolute bottom-0  left-1/2 -translate-x-1/2  transition-all duration-300  ${
          isPromptInputBotton ? "-translate-y-1/2" : "-translate-[250%]"
        }  w-[calc(100%-64px)]  md:w-3/4 flex items-center overflow-hidden bg-default-100 rounded-xl shadow-md shadow-primary-200  `}
      >
        <TextArea
          minRows={3}
          maxRows={8}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="w-[calc(100%-80px)] p-4 outline-0 resize-none text-xl "
        />
        <div
          onClick={() => {
            if (prompt) {
              Chat({ prompt: prompt.trim(), conversationId: id as string });
              setIsPromptInputBotton(true);
            }
            setPrompt("");
          }}
          className="absolute right-0 w-20 h-full flex justify-center items-center  transition-colors duration-300 hover:bg-secondary-200 cursor-pointer"
        >
          <Send size={20} />
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
