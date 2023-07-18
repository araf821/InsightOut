"use client";

import { FC } from "react";

import { useChat } from "ai/react";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="">
      {/* Chat Box */}
      <div className="">
        {messages.map((m) => (
          <span key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </span>
        ))}
        <form onSubmit={handleSubmit}>
          <label>
            Say something...
            <input className="" value={input} onChange={handleInputChange} />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;