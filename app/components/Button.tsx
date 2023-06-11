"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
  special?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  icon: Icon,
  special,
  disabled,
}) => {
  return (
    //   <button
    //     onClick={onClick}
    //     className={`
    //       text-md
    //       relative
    //       w-full
    //       rounded-lg
    //       border-[2px]
    //       px-4
    //       py-2
    //       font-ubuntu
    //       font-semibold
    //       transition
    //       duration-300
    //       disabled:cursor-not-allowed
    //       disabled:opacity-80
    //       md:text-lg
    //       ${special ? "" : ""}
    //       ${special ? "" : ""}
    //       ${special ? "" : ""}
    //       ${
    //         outline
    //           ? "bg-[#FFF6F1] hover:bg-[#B78570]"
    //           : "bg-[#B78570] hover:opacity-70"
    //       }
    //       ${outline ? "border-zinc-800" : ""}
    //       ${outline ? "text-zinc-800" : ""}
    // `}
    //   >
    //     {Icon && <Icon size={24} className="absolute left-4 top-3" />}
    //     {label}
    //   </button>
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm border-2 p-3 text-lg text-zinc-900 outline-none transition-all duration-300  focus:ring-4 md:text-xl lg:gap-4 lg:text-2xl
      ${
        special
          ? "bg-[#ff804a] font-bold hover:outline-zinc-800 focus:ring-zinc-800"
          : outline
          ? "border-zinc-800 bg-[#FFF6F1] hover:bg-[#B78570] hover:outline-zinc-800 focus:ring-zinc-800"
          : "bg-[#B78570] outline-2 hover:outline-[#B78570] focus:ring-[#B78570]"
      }
      `}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};
export default Button;
