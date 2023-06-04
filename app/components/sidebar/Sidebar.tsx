"use client";

import { useSidebarContext } from "@/app/context/sidebar_context";
import { FC } from "react";
import Logo from "../texts/Logo";
import { IoIosCloseCircle } from "react-icons/io";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { isOpen, closeSidebar } = useSidebarContext();

  const header = (
    <div className="w-full bg-orange-50 px-4 py-5 shadow-lg">
      <div className="mx-auto flex max-w-[800px] items-center justify-between">
        <Logo sidebar />
        <button onClick={closeSidebar}>
          <IoIosCloseCircle className="text-3xl text-zinc-800" />
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-screen w-screen -translate-x-full transform  bg-rose-500 duration-500 lg:w-3/4 xl:w-3/5 ${
        isOpen && "translate-x-0"
      }`}
    >
      <div className="mx-auto flex flex-col items-center">{header}</div>
    </div>
  );
};

export default Sidebar;
