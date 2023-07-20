"use client";

import { useChat } from "ai/react";
import { FC } from "react";
import { BsSend } from "react-icons/bs";

interface ChatInputProps {}

const ChatInput: FC<ChatInputProps> = ({}) => {
  const { handleSubmit, input, handleInputChange } = useChat();

  return (
    <form className="mx-auto fixed bottom-0 mb-4 w-full px-2" onSubmit={handleSubmit}>
      <div className="flex gap-2 rounded-xl bg-zinc-800 px-3 py-2">
        <input
          className="w-full border-none outline-none"
          placeholder="Need ideas?"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">
          <BsSend className="text-xl text-primary transition duration-200 hover:scale-110 hover:text-blue-600" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
