"use client";

import { FC } from "react";

import { useChat } from "ai/react";

interface ChatMessagesProps {}

const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="relative overflow-y-auto flex flex-col justify-between px-4 py-2">
      {/* Chat Box */}
      <div className="flex flex-col w-full gap-2">
        {messages.map((m) => (
          <span key={m.id} className={`p-2 rounded-xl max-w-[300px] ${m.role === 'user' ? "bg-neutral-400" : "bg-primary"}`}>
            {m.role === "user" ? "User: " : "Bebibot: "}
            {m.content}
          </span>
        ))}
      </div>
      <form className="fixed bottom-0 pb-4" onSubmit={handleSubmit}>
        <label>
          Say something...
          <input className="" value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatMessages;
