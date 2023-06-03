"use client";

import { useContext } from "react";
import Container from "../Container";
import Sidebar from "../sidebar/Sidebar";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import { SidebarContext } from "@/app/context/sidebar_context";

interface NavbarProps {
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <div className="z-30 w-full capitalize">
      {/* <Container>
        <div className="flex flex-col items-center justify-center pb-9 pt-12 text-white">
          <Logo height={225} width={225} />
          <UserMenu currentUser={currentUser} />
          <button onClick={openSidebar}>click me to open sidebar</button>
          <p className="pt-1 font-semibold">More than just a blog</p>
        </div>
      </Container> */}

      {/* lower nav */}
      {/* <div className="bg-slate-100">
        <Container>
          <div className="flex items-center justify-between"></div>
        </Container>
      </div> */}
    </div>
  );
};
export default Navbar;
