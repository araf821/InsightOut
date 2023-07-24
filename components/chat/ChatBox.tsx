import { motion } from "framer-motion";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import ChatMessages from "./ChatMessages";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const variants = {
  open: (height = 700) => ({
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

interface ChatBoxProps {
  toggle: () => void;
}

export const ChatBox: FC<ChatBoxProps> = ({ toggle }) => {

  return (
    <motion.div
      className="absolute left-0 top-0 h-[450px] w-full bg-white/20 backdrop-blur-lg lg:h-[700px]"
      variants={variants}
    >
      <div
        title="Close Chat"
        className="flex flex-row items-center justify-between bg-secondary/30 px-4 py-2.5 text-black backdrop-blur-none"
      >
          
          
          <p className="md:text-lg">Chat with Bebibot</p>
        <IoClose
          className="cursor-pointer text-xl transition duration-300 hover:rotate-90 hover:scale-150"
          onClick={toggle}
        />
      </div>
      <ChatMessages/>
    </motion.div>
  );
};
