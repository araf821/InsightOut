"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
  special?: boolean;
  small?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  icon: Icon,
  special,
  disabled,
  small,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm border-2 outline-none ring-offset-2 transition-all duration-300 focus:ring-0 disabled:cursor-not-allowed  disabled:opacity-80 
      ${
        special
          ? "border-zinc-800 bg-accent text-black outline-offset-[-6px] hover:outline-zinc-800 focus:"
          : outline
          ? "border-zinc-800 bg-bg text-zinc-800 hover:outline-zinc-800 focus:ring-zinc-800"
          : "border-primary bg-primary outline-2 hover:outline-primary focus:ring-primary"
      }
      ${
        small
          ? "px-2 py-1 text-sm md:text-base lg:text-lg"
          : "px-4 py-2 text-lg md:text-xl lg:gap-4 lg:text-2xl"
      }
      ${className}
      active:ring-transparent`}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};
export default Button;
