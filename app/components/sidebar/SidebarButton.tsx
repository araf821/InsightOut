import { FC } from "react";

interface SidebarButtonProps {
  title: string;
  onClick: () => void;
}

const SidebarButton: FC<SidebarButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative rounded-lg w-full overflow-hidden border-2 border-zinc-900 bg-orange-50 px-5  py-3 font-medium text-gray-600 shadow-inner outline-none hover:outline-2 hover:outline-zinc-900"
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-rose-600 transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-rose-600 transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute left-0 top-0 h-0 w-full bg-rose-600 transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-full bg-rose-600 transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="absolute inset-0 h-full w-full bg-zinc-900 opacity-0 delay-300 duration-300 group-hover:opacity-100"></span>
      <span className="ease relative transition-colors delay-300 duration-500 group-hover:text-white">
        <p className="text-xl md:text-2xl font-bold">{title}</p>
      </span>
    </button>
  );
};

export default SidebarButton;
