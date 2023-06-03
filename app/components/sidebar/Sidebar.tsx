"use client";

import { useSidebarContext } from "@/app/context/sidebar_context";
import { FC } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { isOpen, closeSidebar } = useSidebarContext();

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-screen w-screen -translate-x-full transform transition duration-300 md:w-2/3 lg:w-1/2 xl:w-1/3 ${
        isOpen ? "translate-x-0" : ""
      }`}
    >
      <button onClick={closeSidebar}>close me</button>
    </div>
  );
};

export default Sidebar;
