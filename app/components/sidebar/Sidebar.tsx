"use client";

import { useSidebarContext } from "@/app/context/sidebar_context";
import { FC } from "react";
import Logo from "../texts/Logo";
import { IoIosCloseCircle } from "react-icons/io";
import SidebarContent from "./SidebarContent";
import { SafeUser } from "@/app/types";

interface SidebarProps {
  currentUser: SafeUser | null;
}

const Sidebar: FC<SidebarProps> = ({ currentUser }) => {
  const { isOpen, closeSidebar } = useSidebarContext();

  const header = (
    <div className="w-full bg-bg px-4 py-5 shadow-md">
      <div className="mx-auto flex max-w-[800px] items-center justify-between">
        <Logo sidebar />
        <button onClick={closeSidebar}>
          <IoIosCloseCircle className="text-3xl text-zinc-800 transition duration-500 hover:scale-110 hover:animate-pulse" />
        </button>
      </div>
    </div>
  );

  // Disable scrolling if the sidebar is open

  const hideScrollbar = () => {
    setTimeout(() => {
      document.body.classList.add("overflow-hidden");
    }, 500);
  };

  if (typeof document !== "undefined") {
    if (isOpen) {
      // document.body.classList.add(`overflow-hidden`);
      hideScrollbar();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  return (
    <div
      className={`fixed inset-0 left-0 top-0 z-40 h-screen w-screen -translate-x-full transform   duration-500  ${
        isOpen && "translate-x-0"
      }`}
    >
      <div
        className={`sidebar-bg h-full w-full transition delay-300 duration-300
        ${isOpen && "backdrop-blur-md"}
      `}
      >
        <div className="z-50 h-full w-full bg-primary">
          <div className="mx-auto flex flex-col items-center">{header}</div>
          <SidebarContent currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
