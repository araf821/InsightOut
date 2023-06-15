"use client";

import { FC, useState } from "react";

type SelectOption = {
  label: string;
  value: any;
};

interface MultiSelectProps {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
}

const MultiSelect: FC<MultiSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative flex w-full items-center justify-between rounded-md border-2 border-zinc-800 bg-white px-3 py-1.5 focus:ring-2">
      <span>Value</span>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="cursor-pointer border-none bg-none p-2 text-2xl outline-none focus:ring-primary"
        >
          &times;
        </button>
        <div className="w-0.5 self-stretch bg-black" />
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="translate-y-[50%] border-[4px] border-transparent border-t-zinc-800"
        />
      </div>
      <ul
        className={`${
          isOpen ? "scale-100" : "scale-0"
        } absolute left-0 top-[110%] z-10 max-h-52 w-full space-y-2 overflow-y-auto rounded-md border-2 border-zinc-700 bg-white px-3 py-1.5 transition-transform duration-500`}
      >
        {options.map((option, index) => (
          <li key={index} className="list-none">
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
