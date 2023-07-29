import { motion } from "framer-motion";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import ChatMessages from "./ChatMessages";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { SafeUser } from "@/app/types";

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
  userImage: string;
  toggle: () => void;
}

export const ChatBox: FC<ChatBoxProps> = ({ toggle, userImage }) => {
  return (
    <motion.div
      className="absolute left-0 top-0 h-[450px] w-full bg-gradient-to-b saturate-200 from-zinc-900 via-blue-950/90 to-zinc-900 lg:h-[700px]"
      variants={variants}
    >
      <div className="flex flex-row items-center justify-between px-4 py-2.5 text-white bg-primary/10">
        <p className="md:text-lg">Chat with Bebibot</p>
        <IoClose
          title="Close Chat"
          className="cursor-pointer text-xl transition duration-300 hover:rotate-90 hover:scale-150"
          onClick={toggle}
        />
      </div>
      <ChatMessages userImage={userImage} />
    </motion.div>
  );
};
