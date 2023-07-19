import { motion } from "framer-motion";
import { FC } from "react";
import { IoClose } from "react-icons/io5";
import ChatMessages from "./ChatMessages";

const variants = {
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

interface ChatBoxProps {
  toggle: () => void;
}

export const ChatBox: FC<ChatBoxProps> = ({ toggle }) => {
  return (
    <motion.div
      className="absolute left-0 top-0 h-[450px] w-full bg-secondary"
      variants={variants}
    >
      <div
        onClick={toggle}
        title="Close Chat"
        className="flex cursor-pointer flex-row items-center justify-between bg-zinc-800 px-4 py-2.5 text-white"
      >
        <p className="md:text-lg">Chat with Bebibot</p>
        <IoClose className="text-xl" />
      </div>
      <ChatMessages />
    </motion.div>
  );
};
