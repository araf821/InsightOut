import { FC } from "react";
import { IconType } from "react-icons";

interface NavButtonProps {
  icon?: IconType;
  title: string;
  onClick: () => void;
}

const NavButton: FC<NavButtonProps> = ({ icon: Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group active:scale-90 relative flex w-full items-center justify-center gap-2 overflow-hidden bg-primary p-2 text-lg outline-none ring-offset-2 transition-all duration-200 hover:scale-[1.01] hover:outline-primary focus:ring-2 focus:ring-primary md:text-xl lg:gap-4 lg:text-2xl"
    >
      {Icon && <Icon />}
      <span className="absolute right-0 h-20 w-4 translate-x-12 rotate-12 bg-white/20 transition duration-1000 group-hover:-translate-x-[600px]"></span>
      <span className="absolute left-0 h-20 w-4 -translate-x-12 rotate-12 bg-white/20 transition duration-1000 group-hover:translate-x-[600px]"></span>
      <p className="hidden translate-y-0.5 items-center md:flex">{title}</p>
    </button>
  );
};

export default NavButton;
