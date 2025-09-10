"use client";
import BotMessage from "@/features/message/components/BotMessage";
import UserMessage from "@/features/message/components/UserMessage";
import { useAppStore } from "@/zustand/useAppStore";
import { Spinner } from "@heroui/spinner";
import React from "react";

export enum Roles {
  User = "USER",
  Bot = "BOT",
}

export interface MessagesItem {
  msg: string;
  role: Roles;
}

const MessageField = () => {
  const { messages, isBotPending } = useAppStore();

  return (
    <div className=" md:w-3/4  mx-auto flex flex-col gap-4 ">
      {messages.map((msg: MessagesItem, index) =>
        msg.role === Roles.User ? (
          <UserMessage key={index} message={msg.msg} />
        ) : (
          <BotMessage key={index} message={msg.msg} />
        )
      )}
      {isBotPending && <Spinner color="secondary" size="lg" />}
    </div>
  );
};

export default MessageField;
