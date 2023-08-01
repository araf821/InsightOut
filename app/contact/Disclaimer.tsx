"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface DisclaimerProps {
  title: string;
  content: string;
}

const Disclaimer: FC<DisclaimerProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <p
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-neutral-500 transition duration-200 hover:text-neutral-800 w-fit cursor-pointer"
      >
        {title} <FaCaretDown className={`${isOpen ? "rotate-180" : ""} transition`} />
      </p>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.1 } }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2 },
            }}
            className={`w-full overflow-hidden whitespace-pre-line rounded-md border-2 border-neutral-300 px-2 font-sans text-sm text-neutral-700`}
          >
            <p className="my-1.5">{content}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Disclaimer;
