import { FC } from "react";
import { BsArrowRight } from "react-icons/bs";

interface ChatCommandProps {
  label: string;
  onClick: () => void;
}

const ChatCommand: FC<ChatCommandProps> = ({ label, onClick }) => {
  return (
    <p
      className="mx-auto flex cursor-pointer items-center gap-1 rounded-md bg-primary px-3 py-1.5 font-josefin text-sm font-semibold shadow-lg transition duration-200 hover:translate-x-1 hover:text-white lg:text-xl"
      onClick={onClick}
    >
      <span className="translate-y-0.5">{label}</span>
      <BsArrowRight className="translate-y-0.5" />
    </p>
  );
};

export default ChatCommand;
