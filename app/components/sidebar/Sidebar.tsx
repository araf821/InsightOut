"use client";

import { useSidebarContext } from "@/app/context/sidebar_context";
import { FC } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { isOpen, closeSidebar } = useSidebarContext();

  return (
    <div
      className={`absolute right-0 top-0 h-screen w-screen translate-x-full transform bg-white transition duration-500 ${
        isOpen ? "z-10 -translate-x-0" : ""
      }`}
    >
      <button onClick={closeSidebar}>close me</button>
    </div>
  );
};

export default Sidebar;
