"use client";
import BotMessage from "@/features/message/components/BotMessage";
import UserMessage from "@/features/message/components/UserMessage";
import { useGetMessages } from "@/queries/chat";
import { useParams } from "next/navigation";
import React from "react";

export enum Roles {
  User = "USER",
  Bot = "BOT",
}

interface MessagesItem {
  id: number;
  msg: string;
  role: Roles;
}

const MessageField = () => {
  const { id } = useParams();

  const { data: massages } = useGetMessages(id as string);

  return (
    <div className=" md:w-3/4  mx-auto  ">
      {massages &&
        massages.data.map((msg: MessagesItem) => {
          return (
            <div
              className="flex flex-col items-center justify-end gap-6"
              key={msg.id}
            >
              {msg.role === Roles.User && <UserMessage message={msg.msg} />}
              {msg.role === Roles.Bot && <BotMessage message={msg.msg} />}
            </div>
          );
        })}
    </div>
  );
};

export default MessageField;
