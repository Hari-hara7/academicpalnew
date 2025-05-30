import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  // Function to format message and detect links
  const formatMessage = (text: string) => {
    if (text.includes("🔍 Found notes for") && text.includes("http")) {
      const parts = text.split(": ");
      const beforeLink = parts[0] + ": ";
      const link = parts[1];

      return (
        <>
          {beforeLink}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 break-all"
          >
            {link}
          </a>
        </>
      );
    }
    return text;
  };

  return (
    <div className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-full sm:max-w-lg px-4 py-2 rounded-2xl shadow-md text-sm sm:text-base break-words ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none" // User messages (right-aligned)
            : "bg-gray-700 text-white rounded-bl-none" // Bot messages (left-aligned)
        }`}
      >
        {formatMessage(message)}
      </div>
    </div>
  );
};

export default ChatMessage;
