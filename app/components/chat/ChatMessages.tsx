"use client";

import { FC, useEffect, useRef, useState } from "react";

import { useChat } from "ai/react";
import { BsArrowRight, BsSend } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface ChatMessagesProps {}

const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const {
    messages,
    handleInputChange,
    input,
    handleSubmit,
    isLoading,
    setMessages,
    reload,
    append,
  } = useChat();
  const inverseMessages = [...messages].reverse();
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToBottom = () => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollTop = scrollDownRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const clearChat = () => {
    setMessages([]);
    reload();
    setIsOpen(false);
  };

  const initiateCommand = (message: string) => {
    append({ content: message, role: "user" });
  };

  return (
    <div className="h-[450px] w-full lg:h-[700px]">
      {!messages.length ? (
        <section className="flex-none px-8 py-36 text-center text-lg text-black lg:px-20 lg:py-64">
          Start chatting with Bebibot!
          <div className="mt-1.5 flex flex-col gap-1 text-base text-neutral-800">
            <p
              onClick={() =>
                initiateCommand("Help me generate some ideas for a blog post!")
              }
              className="mx-auto flex cursor-pointer items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 shadow-lg transition duration-200 hover:translate-x-1 hover:text-black"
            >
              Generate Ideas
              <BsArrowRight />
            </p>
            <p
              onClick={() => initiateCommand("I need help with grammar on the blog post I'm writing.")}
              className="mx-auto flex cursor-pointer items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 shadow-lg transition duration-200 hover:translate-x-1 hover:text-black"
            >
              Help with Grammer
              <BsArrowRight />
            </p>
            <p
              onClick={() => initiateCommand("Hello Bebibot! Let's be friends!")}
              className="mx-auto flex cursor-pointer items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 shadow-lg transition duration-200 hover:translate-x-1 hover:text-black"
            >
              General Chat
              <BsArrowRight />
            </p>
          </div>
        </section>
      ) : null}
      <div
        ref={scrollDownRef}
        className="scrolling-touch flex h-[325px] flex-grow flex-col-reverse gap-2 overflow-y-auto lg:h-[575px]"
      >
        {inverseMessages.map((m) => (
          <div
            key={m.id}
            className={`flex p-2 lg:px-4 ${
              m.role === "user" ? "justify-end" : ""
            }`}
          >
            <p
              className={`max-w-[300px] rounded-md px-2.5 py-1.5 font-sans lg:max-w-[500px] lg:text-lg ${
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
          className="fixed bottom-0 mx-auto w-full px-2 py-4 lg:px-4"
          onSubmit={handleSubmit}
        >
          <div
            className={`absolute bottom-6 left-11 w-40 origin-left rounded-md bg-bg shadow-md transition duration-300 hover:-translate-y-1 lg:left-14 ${
              isOpen ? "scale-x-100" : "scale-x-0"
            }`}
          >
            <p
              onClick={clearChat}
              className="cursor-pointer rounded-md px-2 py-1 transition duration-200 hover:bg-bg"
            >
              Clear Chat
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border-2 bg-white px-3 py-2.5 shadow-xl">
            <HiOutlineMenuAlt2
              onClick={() => setIsOpen((isOpen) => !isOpen)}
              className="cursor-pointer text-xl font-bold transition duration-300 hover:scale-125"
            />
            <input
              className="w-full border-none outline-none"
              placeholder="Need ideas?"
              value={input}
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                if (isOpen) {
                  clearChat();
                }
              }}
              type="submit"
            >
              <BsSend className="text-xl text-primary transition duration-200 hover:scale-125 hover:text-blue-600" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatMessages;
