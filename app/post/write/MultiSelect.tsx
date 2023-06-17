"use client";

import { FC, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { SelectOption } from "./SingleSelect";
import { toast } from "react-hot-toast";

interface MultiSelectProps {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

const MultiSelect: FC<MultiSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function clearOptions() {
    onChange([]);
  }

  function selectOption(option: SelectOption) {
    if (value?.includes(option)) {
      onChange(value.filter((val) => val !== option));
    } else {
      if (value.length === 5) {
        toast.error("You may only add up to 5 tags.");
        return;
      }
      onChange([...value, option]);
    }
  }

  function isSelected(option: SelectOption) {
    return value?.includes(option);
  }

  return (
    <div
      title="Post Tags"
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={6}
      className="relative flex w-full items-center justify-between rounded-md border-2 border-neutral-300 bg-white px-3 py-2"
    >
      <span className="flex flex-wrap gap-2 overflow-x-auto">
        {value.length === 0 ? (
          <span className="text-neutral-500">Tags</span>
        ) : (
          value?.map((val) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectOption(val);
              }}
              key={val.value}
              className="flex items-center gap-2 rounded-md border-2 border-zinc-600 bg-bg px-2 py-1 text-sm md:text-base"
            >
              {val.label}
              <IoIosCloseCircle className="text-lg md:text-xl" />
            </button>
          ))
        )}
      </span>
      <div className="flex items-center justify-center gap-2 self-stretch">
        <button
          type="button"
          className="hidden cursor-pointer border-none bg-none p-2 text-2xl outline-none sm:block"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          title="Clear All Tags"
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
        } absolute left-0 top-[110%] z-10 max-h-72 w-full origin-top-left overflow-y-auto rounded-md border-2 border-zinc-700 bg-white transition-transform duration-200 ease-out`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={`cursor-pointer list-none px-3 py-2.5 transition-colors hover:bg-primary 
            ${isSelected(option) && "bg-bg"}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
