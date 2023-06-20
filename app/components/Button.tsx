"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
  special?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  icon: Icon,
  special,
  disabled,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={` group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm border-2 px-4 py-2 text-lg outline-none ring-offset-2 transition-all duration-300  focus:ring-2 md:text-xl lg:gap-4 lg:text-2xl
      ${
        special
          ? "border-zinc-800 bg-accent text-bg outline-offset-[-6px] hover:outline-bg focus:ring-bg"
          : outline
          ? "border-zinc-800 bg-bg text-zinc-800 hover:outline-zinc-800 focus:ring-zinc-800"
          : "border-primary bg-primary outline-2 hover:outline-primary focus:ring-primary"
      }
      ${className}
      `}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};
export default Button;
