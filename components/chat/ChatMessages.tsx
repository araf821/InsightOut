"use client";

import { useEffect, useRef, useState } from "react";

import { useChat } from "ai/react";
import { BsSend } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import ChatCommand from "./ChatCommand";
import { AnimatePresence, motion } from "framer-motion";

const ChatMessages = () => {
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
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    inputRef.current?.focus();
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
    <>
      {!messages.length ? (
        <section className="grid h-full place-items-center text-center">
          <div className="rounded-md bg-white/30 p-6 shadow-[0_8px_32px_5px_#ffffff1e] saturate-200 backdrop-blur-lg">
            <div className="mt-1.5 flex flex-col gap-1.5 text-neutral-200 lg:gap-2.5">
              <p className="text-lg text-black">Start chatting with Bebibot!</p>

              <ChatCommand
                label="Generate Ideas"
                onClick={() =>
                  initiateCommand(
                    "Help me generate some ideas for a blog post!"
                  )
                }
              />

              <ChatCommand
                label="Help With Grammar"
                onClick={() =>
                  initiateCommand(
                    "I need help with grammar on the blog post I'm writing."
                  )
                }
              />

              <ChatCommand
                label="General Chat"
                onClick={() =>
                  initiateCommand("Hello Bebibot! Let's be friends!")
                }
              />
            </div>
          </div>
        </section>
      ) : (
        <AnimatePresence>
          <motion.div
            animate={{ height: "auto" }}
            ref={scrollDownRef}
            className="scrolling-touch flex flex-grow flex-col-reverse gap-2 overflow-y-auto "
          >
            {inverseMessages.map((m) => (
              <div
                key={m.id}
                className={`flex p-2 lg:px-4 ${
                  m.role === "user" ? "justify-end" : ""
                }`}
              >
                <p
                  className={`max-w-[280px] sm:max-w-[525px] md:max-w-[650px] rounded-md px-2.5 py-1.5 font-sans lg:max-w-[525px] lg:text-lg ${
                    m.role === "user"
                      ? "bg-primary text-white shadow-[0_0_10px_2px] shadow-black/20"
                      : "bg-white/40 text-white shadow-[0_0_10px_2px] shadow-black/10 saturate-200 backdrop-blur-lg"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {messages.length &&
      messages[messages.length - 1].role.toString() !== "user" &&
      isLoading ? (
        <p className="mx-auto w-full px-2 py-6 text-center text-white lg:px-4">
          Bebibot is typing...
        </p>
      ) : (
        <form
          className="mx-auto w-full px-2 py-4 lg:px-4"
          onSubmit={handleSubmit}
        >
          <div
            className={`absolute bottom-14 left-3 z-10 w-40 origin-bottom-left rounded-md bg-primary shadow-md transition duration-300 hover:-translate-y-1 lg:left-4 ${
              isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          >
            <p
              onClick={clearChat}
              className="cursor-pointer rounded-md px-2 py-1 transition duration-200"
            >
              Clear Chat
            </p>
          </div>
          <div
            // className="flex border-primary shadow-primary/20 shadow-[0_0_20px_10px] focus:border-primary/20 items-center gap-2 rounded-lg border-2 bg-blue-900/20 px-3 py-2.5"
            className="relative flex w-full"
          >
            <HiOutlineMenuAlt2
              onClick={() => setIsOpen((isOpen) => !isOpen)}
              className="absolute left-2 top-3 cursor-pointer text-xl font-bold text-white transition duration-300 hover:scale-125"
            />
            <input
              className="w-full rounded-md border-2 border-primary/50 bg-transparent p-2 pl-8 pr-10 text-white shadow-[0_0_20px_10px] shadow-primary/20 outline-none focus:border-primary focus:shadow-primary/30"
              placeholder="Need ideas?"
              value={input}
              min={1}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <button
              className="absolute bottom-0 right-4 top-0"
              onClick={() => {
                if (isOpen) {
                  clearChat();
                }
              }}
              type="submit"
            >
              <BsSend className="text-xl text-primary transition duration-200 hover:scale-125 hover:text-blue-300" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ChatMessages;
