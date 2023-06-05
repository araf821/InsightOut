import { FC } from "react";

interface SidebarButtonProps {
  title: string;
  onClick: () => void;
}

const SidebarButton: FC<SidebarButtonProps> = ({ title, onClick }) => {
  return <button className="w-full bg-orange-50 px-4 py-3">
    {title}
  </button>;
};

export default SidebarButton;
