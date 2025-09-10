import React from "react";

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <span className="max-w-lg overflow-y-auto p-3 bg-secondary-200 rounded-xl self-end break-words">
      {message}
    </span>
  );
};

export default UserMessage;
