import { motion } from "framer-motion";
import { FC } from "react";
import { IoClose } from "react-icons/io5";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface ChatBoxProps {toggle: () => void}

export const ChatBox: FC<ChatBoxProps> = ({toggle}) => {
  return (
    <motion.div
          className="absolute left-0 top-0 h-full w-full"
          variants={variants}
        >
          <div
            onClick={toggle}
            title="Close Chat"
            className="flex cursor-pointer flex-row items-center justify-between bg-zinc-800 px-4 py-2 text-white"
          >
            <p className="md:text-lg">Chat with Bebibot</p>
            <IoClose className="text-xl" />
          </div>
        </motion.div>
  );
};
