import { FC } from "react";

interface MoreOptionsButtonProps {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

const MoreOptionsButton: FC<MoreOptionsButtonProps> = ({
  label,
  onClick,
  destructive,
}) => {
  return (
    <button
      className={`w-full py-1.5 text-sm font-semibold text-zinc-800 transition duration-300 hover:bg-opacity-80 sm:text-base md:text-lg ${
        destructive ? "bg-accent" : "bg-white"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MoreOptionsButton;
