"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { BsSend } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import ChatCommand from "./ChatCommand";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

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
    error,
  } = useChat();

  const inverseMessages = [...messages].reverse();
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollTop = scrollDownRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [isLoading, scrollToBottom]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }

    return () => {
      // Cleanup focus when component unmounts
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    setIsInputEmpty(!input.trim());
  }, [input]);

  // Handle keyboard interactions for menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsOpen(false);
    reload();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [setMessages, reload]);

  const initiateCommand = useCallback(
    (message: string) => {
      if (!message.trim()) return;
      append({ content: message, role: "user" });
    },
    [append]
  );

  const [retryIn, setRetryIn] = useState<number | null>(null);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isInputEmpty || isLoading || retryIn !== null) return;

      try {
        await handleSubmit(e);
      } catch (error: any) {
        if (
          error?.message?.includes("rate limit") ||
          error?.message?.includes("too fast")
        ) {
          setRetryIn(7);
          const timer = setInterval(() => {
            setRetryIn((prev) => {
              if (prev === null || prev <= 1) {
                clearInterval(timer);
                return null;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    },
    [handleSubmit, isInputEmpty, isLoading, retryIn]
  );

  const getErrorMessage = useCallback((error: Error) => {
    try {
      const parsedError = JSON.parse(error.message);
      if (parsedError.error?.message) {
        return parsedError.error.message;
      }
    } catch {
      // If error message isn't JSON, display it directly
      if (error.message.includes("fetch failed")) {
        return "Unable to connect to the chat service. Please check your internet connection.";
      }
    }
    return error.message || "An unexpected error occurred";
  }, []);

  if (error) {
    return (
      <div
        className="grid h-full place-items-center text-center"
        role="alert"
        aria-live="assertive"
      >
        <div className="max-w-md rounded-lg bg-white/10 p-6 shadow-lg backdrop-blur-sm">
          <p className="mb-4 text-red-400">{getErrorMessage(error)}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                reload();
                if (error) {
                  setMessages(messages.slice(0, -1)); // Remove the last error-causing message
                }
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              className="rounded bg-primary px-4 py-2 text-white transition-all hover:bg-primary/80"
              aria-label="Try again"
            >
              Try Again
            </button>
            <button
              onClick={clearChat}
              className="rounded bg-gray-600 px-4 py-2 text-white transition-all hover:bg-gray-700"
              aria-label="Clear chat and start over"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            className="scrolling-touch flex flex-grow flex-col-reverse gap-2 overflow-y-auto"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {inverseMessages.map((m) => (
              <div
                key={m.id}
                className={`flex p-2 lg:px-4 ${
                  m.role === "user" ? "justify-end" : ""
                }`}
              >
                <div
                  role={m.role === "user" ? "complementary" : "article"}
                  aria-label={`${
                    m.role === "user" ? "Your" : "Bebibot's"
                  } message`}
                  className={`max-w-[280px] sm:max-w-[525px] md:max-w-[650px] rounded-md px-2.5 py-1.5 font-sans lg:max-w-[525px] lg:text-lg ${
                    m.role === "user"
                      ? "bg-primary text-white shadow-[0_0_10px_2px] shadow-black/20"
                      : "bg-white/40 text-white shadow-[0_0_10px_2px] shadow-black/10 saturate-200 backdrop-blur-lg"
                  }`}
                >
                  <p>{m.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {messages.length > 0 &&
      messages[messages.length - 1].role !== "user" &&
      isLoading ? (
        <div
          className="mx-auto w-full px-2 py-6 text-center lg:px-4"
          aria-live="polite"
          role="status"
        >
          <p className="text-white">Bebibot is typing...</p>
        </div>
      ) : (
        <form
          className="mx-auto w-full px-2 py-4 lg:px-4"
          onSubmit={handleFormSubmit}
          aria-label="Chat input form"
        >
          <div
            className={`absolute bottom-14 left-3 z-10 w-40 origin-bottom-left rounded-md bg-primary shadow-md transition-all duration-300 hover:-translate-y-1 lg:left-4 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            role="menu"
            aria-hidden={!isOpen}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                clearChat();
              }}
              type="button"
              className="w-full cursor-pointer rounded-md px-2 py-1 text-left text-white transition duration-200 hover:bg-primary/80"
              role="menuitem"
            >
              Clear Chat
            </button>
          </div>
          <div className="relative flex w-full">
            <HiOutlineMenuAlt2
              onClick={() => setIsOpen((prev) => !prev)}
              className="absolute left-2 top-3 cursor-pointer text-xl font-bold text-white transition duration-300 hover:scale-125"
              aria-label="Toggle menu"
              role="button"
              aria-expanded={isOpen}
            />
            <div className="relative w-full">
              <input
                className={`w-full rounded-md border-2 bg-transparent p-2 pl-8 pr-10 text-white shadow-[0_0_20px_10px] outline-none transition-all duration-200 ${
                  retryIn !== null
                    ? "border-yellow-500/50 shadow-yellow-500/20 focus:border-yellow-500 focus:shadow-yellow-500/30"
                    : "border-primary/50 shadow-primary/20 focus:border-primary focus:shadow-primary/30"
                }`}
                placeholder={
                  retryIn !== null
                    ? `Please wait ${retryIn}s before sending...`
                    : "Type your message here..."
                }
                value={input}
                onChange={handleInputChange}
                ref={inputRef}
                aria-label="Chat input"
                disabled={isLoading || retryIn !== null}
              />
              <div className="absolute bottom-0 right-4 top-0 flex items-center">
                {retryIn !== null ? (
                  <span className="text-sm text-yellow-500" aria-live="polite">
                    {retryIn}s
                  </span>
                ) : (
                  <button
                    className="disabled:opacity-50"
                    type="submit"
                    disabled={isInputEmpty || isLoading || retryIn !== null}
                    aria-label={
                      isLoading
                        ? "Sending message..."
                        : retryIn !== null
                        ? `Please wait ${retryIn} seconds`
                        : "Send message"
                    }
                  >
                    <BsSend
                      className={`text-xl transition duration-200 hover:scale-125 ${
                        isLoading || isInputEmpty
                          ? "text-primary/50"
                          : "text-primary hover:text-blue-300"
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ChatMessages;
