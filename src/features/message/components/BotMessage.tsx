import React from "react";
interface BotMessageProps {
  message: string;
}
const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return <span className="size-fit p-3 rounded-xl self-start">{message}</span>;
};

export default BotMessage;
