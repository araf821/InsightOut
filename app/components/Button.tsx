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
        w-full
        relative
        rounded-lg
        hover:opacity-80
        transition
        py-3
        text-md
        font-semibold
        border-[2px]
        ${outline ? "bg-white" : "bg-gray-800"}
        ${outline ? "border-black" : "border-gray-800"}
        ${outline ? "text-black" : "text-white"}
        
  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
export default Button;
