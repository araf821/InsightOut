"use client";

import { FC, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";

export type SelectOption = {
  label: string;
  value: any;
};

interface SingleSelectProps {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
}

const SingleSelect: FC<SingleSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option);
  }

  function isSelected(option: SelectOption) {
    return option === value;
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={6}
      className="relative flex w-full items-center justify-between rounded-md border-2 border-neutral-300 bg-white px-3 py-1.5"
    >
      <span>{value?.label}</span>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="cursor-pointer border-none bg-none p-2 text-2xl outline-none"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          <IoIosCloseCircle />
        </button>
        <div className="w-0.5 self-stretch bg-neutral-400" />
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
            ${isSelected(option) ? "bg-bg hover:bg-bg" : "hover:bg-primary"}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleSelect;
