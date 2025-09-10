"use client";

import { Roles } from "@/features/messageField/components/MessageField";
import TextArea from "@/features/textArea/components/TextArea";
import { useChat } from "@/queries/chat";
import { useAppStore } from "@/zustand/useAppStore";
import { Send } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useEffect } from "react";
import { useForm } from "react-hook-form";

interface ChatFormData {
  prompt: string;
}

const PromptInput: React.FC = ({}) => {
  const { id } = useParams();
  const { push } = useRouter();
  const path = usePathname();

  const { setMessage, setIsBotPending } = useAppStore();

  const { mutate: Chat, isPending } = useChat({
    onSuccess(data) {
      if (path !== `/chat/${data.data.conversationId}`) {
        push(`/chat/${data.data.conversationId}`);
      }
      setMessage({
        msg: data.data.message,
        role: Roles.Bot,
      });
    },
  });

  const { register, reset, formState, handleSubmit } = useForm<ChatFormData>();

  const onSubmit = ({ prompt }: ChatFormData) => {
    setMessage({ msg: prompt, role: Roles.User });
    reset({ prompt: "" });
    Chat({ prompt, conversationId: id as string });
  };

  useEffect(() => {
    setIsBotPending(isPending);
  }, [isPending, setIsBotPending]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className={`w-[calc(100%-64px)]  md:w-3/4 flex items-center overflow-hidden bg-default-100 rounded-xl shadow-md shadow-primary-200  `}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea
        minRows={3}
        maxRows={8}
        className="w-[calc(100%-80px)] p-4 outline-0 resize-none text-xl "
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        disabled={!formState.isValid}
        className={`w-20 h-full flex justify-center items-center  transition-colors duration-300  ${
          formState.isValid
            ? "hover:bg-secondary-200  cursor-pointer"
            : " opacity-10"
        }`}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default PromptInput;
