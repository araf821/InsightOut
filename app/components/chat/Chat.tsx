"use client";

import { FC } from "react";

import { useChat } from "ai/react";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

// <div className="mx-auto flex w-full max-w-[800px] flex-col gap-8 p-8">
//   <div className="bg-secondary p-2">
//     <p>{messages[0].role} says...</p>
//     {messages.map((message, index) => (
//       <span key={index}>{message.content}</span>
//     ))}
//   </div>
//   <form onSubmit={handleSubmit}>
//     <input type="text" value={input} />
//     <button type="submit">Send</button>
//   </form>
// </div>
