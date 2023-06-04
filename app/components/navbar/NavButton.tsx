import { FC } from "react";
import { IconType } from "react-icons";

interface NavButtonProps {
  icon: IconType;
  title: string;
}

const NavButton: FC<NavButtonProps> = ({ icon: Icon, title }) => {
  return (
    <button className="flex w-full items-center justify-center gap-2 bg-rose-600 p-3 text-lg text-zinc-900 outline-none transition-all duration-200 hover:scale-[1.01] hover:outline-2 hover:outline-rose-600 focus:ring-2 focus:ring-rose-600 md:text-xl lg:gap-4 lg:text-2xl">
      <Icon />
      <p className="hidden font-semibold md:block">{title}</p>
    </button>
  );
};

export default NavButton;
