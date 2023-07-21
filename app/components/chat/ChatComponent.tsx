"use client";

import { useDimensions } from "@/app/hooks/useDimensions";
import { motion, useCycle } from "framer-motion";
import { FC, useRef } from "react";
import { ChatToggle } from "./ChatToggle";
import { ChatBox } from "./ChatBox";

interface ChatComponentProps {}

const variants = {
  open: {
    boxShadow: "0px 0px 20px 0px #525252",
    transition: {
      boxShadow: { delay: 0.3, duration: 0.3 },
    },
  },
  closed: {
    transition: {
      delay: 0.1,
    },
  },
};

// const variants = {
//   open: {
//     transition: { staggerChildren: 0.07, delayChildren: 0.2 },
//   },
//   closed: {
//     transition: { staggerChildren: 0.05, staggerDirection: -1 },
//   },
// };

const ChatComponent: FC<ChatComponentProps> = ({}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    // Chat component resides at the bottom right corner of the screen at all times
    <motion.div
      initial={{
        opacity: 0,
        x: 100,
      }}
      whileInView={{
        opacity: 1,
        x: 1,
        transition: { duration: 0.75 },
      }}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`fixed bottom-4 right-4 z-[9999] h-[450px] w-[90%] overflow-hidden rounded-lg sm:w-[400px] lg:bottom-8 lg:right-8 lg:h-[700px] lg:w-[650px] ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      <section className="relative h-full w-full">
        <ChatBox toggle={() => toggleOpen()} />
        <ChatToggle toggle={() => toggleOpen()} />
      </section>
    </motion.div>
  );
};

export default ChatComponent;
