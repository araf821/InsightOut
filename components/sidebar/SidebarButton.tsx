import { FC } from "react";
import { IconType } from "react-icons";
import { useSidebarContext } from "@/app/context/sidebar_context";
import { useModal } from "@/hooks/useModal";

interface SidebarButtonProps {
  title: string;
  onClick: () => void;
  icon?: IconType;
}

const SidebarButton: FC<SidebarButtonProps> = ({
  title,
  onClick,
  icon: Icon,
}) => {
  const {onOpen} = useModal();
  
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-lg border-2 border-zinc-800 bg-bg p-3 font-medium text-zinc-800 shadow-inner ring-offset-zinc-800 focus:outline-2 focus:outline-zinc-800"
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-zinc-800 transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-zinc-800 transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute left-0 top-0 h-0 w-full bg-zinc-800 transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-full bg-zinc-800 transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="ease relative transition-colors delay-150 duration-500 group-hover:text-white">
        <p className="flex items-center justify-center gap-4 text-xl font-josefin translate-y-0.5 font-semibold md:text-2xl">
          {Icon && <Icon />}
          {title}
        </p>
      </span>
    </button>
  );
};

export default SidebarButton;
