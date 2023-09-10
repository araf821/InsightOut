"use client";

import { useSidebarContext } from "@/app/context/sidebar_context";
import { FC } from "react";
import Logo from "../texts/Logo";
import { IoIosCloseCircle } from "react-icons/io";
import SidebarContent from "./SidebarContent";
import { motion } from "framer-motion";
import { sidebarBackgroundVariants, sidebarVariants } from "@/lib/anim";
import { User } from "@prisma/client";

interface SidebarProps {
  currentUser: User | null;
}

const Sidebar: FC<SidebarProps> = ({ currentUser }) => {
  const { isOpen, closeSidebar } = useSidebarContext();

  const header = (
    <div className="w-full h-[10vh] bg-bg px-4 py-5 shadow-md">
      <div className="mx-auto h-full flex max-w-[800px] items-center justify-between">
        <Logo sidebar />
        <button onClick={closeSidebar}>
          <IoIosCloseCircle className="text-3xl text-zinc-800 transition duration-300 hover:rotate-90 hover:scale-125" />
        </button>
      </div>
    </div>
  );

  // Disable scrolling if the sidebar is open
  const hideScrollbar = () => {
    setTimeout(() => {
      document.body.classList.add("overflow-hidden");
    }, 300);
  };

  if (typeof document !== "undefined") {
    if (isOpen) {
      hideScrollbar();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  return (
    <motion.div
      variants={sidebarBackgroundVariants}
      animate={isOpen ? "visible" : "hidden"}
      className={`fixed left-0 top-0 z-40 h-screen w-screen ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`flex justify-end sidebar-bg h-full w-full
        ${isOpen && "backdrop-blur-md"}
      `}
      >
        <motion.div
          variants={sidebarVariants}
          initial={false}
          animate={isOpen ? "visible" : "hidden"}
          className="z-40 flex flex-col h-full w-full bg-primary shadow-2xl md:max-w-[500px]"
        >
          <div className="mx-auto flex flex-col w-full items-center">{header}</div>
          <SidebarContent currentUser={currentUser} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
