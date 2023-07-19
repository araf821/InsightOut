"use client";

import { useDimensions } from "@/app/hooks/useDimensions";
import { motion, useCycle } from "framer-motion";
import { FC, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ChatToggle } from "./ChatToggle";
import { ChatBox } from "./ChatBox";

interface ChatComponentProps {}

const chatBoxBackground = {
  open: (height = 500) => ({
    clipPath: `circle(${height * 2 + 200}px at 90% 90%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 90% 90%)",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ChatComponent: FC<ChatComponentProps> = ({}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  //   const body = isOpen ? (
  //     <motion.div
  //       initial={{ opacity: 0, width: "4rem", height: "4rem" }}
  //       whileInView={{
  //         width: "100%",
  //         height: "100%",
  //         opacity: 1,
  //         transition: { duration: 1 },
  //       }}
  //       className="flex flex-col"
  //     >
  //       {/* Header */}
  //       <div
  //         title="Close Chat"
  //         onClick={() => setIsOpen(false)}
  //         className="flex cursor-pointer flex-row items-center justify-between bg-zinc-800 px-4 py-2 text-white"
  //       >
  //         <p className="md:text-lg">Chat with Bebibot</p>
  //         <IoClose className="text-xl" />
  //       </div>
  //     </motion.div>
  //   ) : (
  //     <div
  //       onClick={() => setIsOpen(true)}
  //       className="relative aspect-square overflow-hidden rounded-full outline outline-offset-4 outline-accent"
  //     >
  //       <Image
  //         src="/images/bebibot.png"
  //         alt="chatbot profile picture"
  //         fill
  //         className="object-cover"
  //       />
  //     </div>
  //   );

  //   ${
  //     isOpen
  //       ? "w-80 rounded-md"
  //       : "h-12 w-12 cursor-pointer rounded-full opacity-80 shadow-[0_0_20px] shadow-accent transition duration-500 hover:scale-110 hover:opacity-100 hover:shadow-[0_0_20px_2px] hover:shadow-accent md:h-16 md:w-16"
  //   }

  return (
    // Chat component resides at the bottom right corner of the screen at all times
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="fixed bottom-4 right-4 z-[9999] h-[450px] w-[90%] sm:w-[400px] overflow-hidden rounded-lg lg:bottom-8 lg:right-8"
    >
      {/* {body} */}
      <section className="relative h-full w-full">
        {/* Chat box, initially scaled down and hidden */}
        <motion.div
          variants={chatBoxBackground}
          className="absolute bottom-0 right-0 h-full w-full bg-black"
        />

        <ChatBox toggle={() => toggleOpen()} />
        <ChatToggle toggle={() => toggleOpen()} />
      </section>

      {/* <motion.div variants={variants}>
        <div
          onClick={() => toggleOpen()}
          title="Close Chat"
          className="flex cursor-pointer flex-row items-center justify-between bg-zinc-800 px-4 py-2 text-white"
        >
          <p className="md:text-lg">Chat with Bebibot</p>
          <IoClose className="text-xl" />
        </div>
      </motion.div> */}
      {/* <div
        onClick={() => toggleOpen()}
        className="relative aspect-square overflow-hidden rounded-full outline outline-offset-4 outline-accent"
      >
        <Image
          src="/images/bebibot.png"
          alt="chatbot profile picture"
          fill
          className="object-cover"
        />
      </div> */}
    </motion.div>
  );
};

export default ChatComponent;
