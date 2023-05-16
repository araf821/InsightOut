"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        text-md
        relative
        w-full
        rounded-lg
        border-[2px]
        p-2 py-3
        font-semibold
        transition
        hover:opacity-80
        ${outline ? "bg-white" : "bg-zinc-800"}
        ${outline ? "border-zinc-800" : "border-zinc-800"}
        ${outline ? "text-zinc-800" : "text-white"}
        
  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
export default Button;
