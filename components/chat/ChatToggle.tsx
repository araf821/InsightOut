import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ChatToggleProps {
  toggle: () => void;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({ toggle }) => (
  <motion.button
    variants={{
      closed: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      },
      open: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      },
    }}
    className="pointer-events-auto border-spacing-24 border-accent border-2 absolute bottom-2 right-2 z-[9999] h-12 w-12 cursor-pointer overflow-hidden rounded-full shadow-[0_0_15px_1px] shadow-accent lg:h-16 lg:w-16"
    onClick={toggle}
    title="Open Chat"
  >
    <Image
      src="/images/bebibot.png"
      alt="chatbot profile picture"
      fill
      className="object-cover transition duration-500 hover:scale-[1.75]"
    />
  </motion.button>
);
