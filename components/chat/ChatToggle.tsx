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
        pointerEvents: "none",
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      },
    }}
    className={`pointer-events-auto absolute bottom-2 right-4 lg:bottom-8 lg:right-8 z-40 h-12 w-12 border-spacing-24 cursor-pointer overflow-hidden rounded-full border-2 border-accent shadow-[0_0_15px_1px] shadow-accent lg:h-16 lg:w-16`}
    onClick={toggle}
    title="Open Chat"
  >
    <Image
      src="/images/bebibot.webp"
      alt="chatbot profile picture"
      fill
      quality={20}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition duration-500 hover:scale-[1.75]"
    />
  </motion.button>
);
