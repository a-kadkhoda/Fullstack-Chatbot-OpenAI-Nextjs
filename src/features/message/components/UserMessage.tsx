import React from "react";

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <span className="size-fit p-3 bg-secondary rounded-xl self-end">
      {message}
    </span>
  );
};

export default UserMessage;
