"use client";

import { FC } from "react";

import { useChat } from "ai/react";
import { BsSend } from "react-icons/bs";

interface ChatMessagesProps {}

const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const { messages, handleInputChange, input, handleSubmit, isLoading } =
    useChat();
  const inverseMessages = [...messages].reverse();

  return (
    <div className="h-[450px] w-full lg:h-[700px]">
      {!messages.length ? (
        <p className="flex-none py-36 text-center px-8 text-xl font-semibold">This is the beginning of your chat with Bebibot!</p>
      ) : null}
      <div className="flex h-[325px] flex-col-reverse gap-2 overflow-y-auto lg:h-[575px]">
        {inverseMessages.map((m) => (
          <div
            key={m.id}
            className={`flex p-2 lg:px-4 ${
              m.role === "user" ? "justify-end" : ""
            }`}
          >
            <p
              className={`max-w-[300px] break-words rounded-md px-2.5 py-1.5 lg:max-w-[500px] ${
                m.role === "user"
                  ? "bg-accent text-black shadow-[0_0_10px_2px] shadow-black/20"
                  : "bg-neutral-200 shadow-[0_0_10px_2px] shadow-black/10"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>
      {messages.length &&
      messages[messages.length - 1].role.toString() !== "user" &&
      isLoading ? (
        <p className="fixed bottom-0 mb-4 w-full text-center font-josefin text-xl font-semibold">
          Bebibot is typing...
        </p>
      ) : (
        <form
          className="fixed bottom-0 mx-auto w-full px-2 py-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 rounded-xl bg-white px-3 py-2.5">
            <input
              className="w-full border-none outline-none"
              autoFocus
              placeholder="Need ideas?"
              value={input}
              onChange={handleInputChange}
            />
            <button type="submit">
              <BsSend className="text-xl text-primary transition duration-200 hover:scale-125 hover:text-blue-600" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatMessages;
