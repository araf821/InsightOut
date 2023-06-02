import { FC, useCallback, useState } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {}, []);

  return (
    <div
      className={`absolute right-0 top-0 -z-10 h-screen w-screen translate-x-full transform bg-white duration-300 ${
        isOpen ? "-z-10 translate-x-0" : ""
      }`}
    ></div>
  );
};

export default Sidebar;
