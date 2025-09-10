"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
interface BotMessageProps {
  message: string;
}
const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <span className="w-full text-lg overflow-y-auto  p-3 rounded-xl self-start break-words ">
      <ReactMarkdown>{message}</ReactMarkdown>
    </span>
  );
};

export default BotMessage;
