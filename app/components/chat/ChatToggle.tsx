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
    className="absolute bottom-2 right-2 h-12 w-12 cursor-pointer overflow-hidden rounded-full bg-accent shadow-[0_0_15px_1px] shadow-accent outline outline-offset-4 outline-accent lg:h-16 lg:w-16"
    onClick={toggle}
  >
    <Image
      src="/images/bebibot.png"
      alt="chatbot profile picture"
      fill
      className="object-cover"
    />
  </motion.button>
);
