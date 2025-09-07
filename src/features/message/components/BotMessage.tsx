import React from "react";
interface BotMessageProps {
  message: string;
}
const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <span className="max-w-[952px] h-full overflow-y-auto  p-3 rounded-xl self-start">
      {message}
    </span>
  );
};

export default BotMessage;
