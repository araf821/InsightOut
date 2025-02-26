"use client";

import { useDimensions } from "@/hooks/useDimensions";
import { motion, useCycle } from "framer-motion";
import { useCallback, useRef, memo } from "react";
import { ChatToggle } from "./ChatToggle";
import { IoClose } from "react-icons/io5";
import ChatMessages from "./ChatMessages";

interface ChatComponentProps {
  className?: string;
}

const chatVariants = {
  open: (height = 700) => ({
    clipPath: `circle(${height * 2 + 200}px at 90% 90%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
    opacity: 1,
  }),
  closed: {
    opacity: 0,
    clipPath: "circle(0px at 90% 90%)",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

/**
 * ChatComponent - A floating chat interface with animation
 *
 * Features:
 * - Animated entrance and exit
 * - Responsive design
 * - Keyboard accessibility
 *
 * @param {ChatComponentProps} props - Component props
 */
const ChatComponent = ({ className = "" }: ChatComponentProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  const handleClose = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 100,
      }}
      whileInView={{
        opacity: 1,
        x: 1,
        transition: { duration: 0.75, ease: "easeOut" },
      }}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`fixed bottom-0 right-0 z-[100] lg:p-0 h-full px-2 py-10 w-full overflow-hidden lg:bottom-8 lg:right-8 transition-all duration-300 lg:h-[700px] lg:w-[650px] ${
        isOpen ? "backdrop-blur-sm lg:backdrop-blur-0" : "pointer-events-none"
      } ${className}`}
      role="dialog"
    >
      <section className="rounded-md relative h-full w-full">
        <motion.div
          variants={chatVariants}
          className="flex h-full w-full flex-col justify-between"
          role="region"
          aria-live="polite"
        >
          {/* Chat Header */}
          <div className="flex rounded-t-lg flex-row items-center justify-between bg-blue-900/90 px-4 py-2.5 text-white">
            <p className="md:text-lg font-medium">Chat with Bebibot</p>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <IoClose className="cursor-pointer text-xl transition duration-300 hover:rotate-90 hover:scale-150" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="rounded-b-lg flex-grow overflow-y-auto bg-gradient-to-b from-zinc-900 via-blue-950/90 to-zinc-900 saturate-200 scrollbar-thin scrollbar-thumb-blue-900/50 scrollbar-track-transparent">
            <div className="flex h-full w-full flex-col">
              <ChatMessages />
            </div>
          </div>
        </motion.div>
        <ChatToggle toggle={handleClose} />
      </section>
    </motion.div>
  );
};

export default memo(ChatComponent);
