"use client";

import { FC, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { motion } from "framer-motion";

export type SelectOption = {
  label: string;
  value: any;
};

interface SingleSelectProps {
  options: string[];
  selected?: string;
  onChange: (value: string) => void;
}

const SingleSelect: FC<SingleSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function selectOption(option: string) {
    if (option !== selected) onChange(option);
  }

  function isSelected(option: string) {
    return option === selected;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={6}
      className="relative z-30 flex w-full items-center justify-between rounded-md border-2 border-neutral-300 bg-white px-3 py-1.5"
    >
      <span>{selected}</span>
      <div className="flex items-center justify-center gap-2">
        <div className="cursor-pointer">
          <AiOutlineCaretDown />
        </div>
      </div>
      <ul
        className={`${
          isOpen ? "scale-y-100" : "scale-y-0"
        } absolute left-0 top-[110%] z-10 max-h-screen w-full origin-top-left overflow-y-auto rounded-md border-2 border-zinc-700 bg-white transition-transform duration-200 ease-out`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={`cursor-pointer list-none px-3 py-2.5 transition-colors 
            ${isSelected(option) ? "bg-primary/60" : "hover:bg-primary"}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SingleSelect;
