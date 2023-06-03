"use client";

import { useContext } from "react";
import Logo from "../texts/Logo";
import { SafeUser } from "@/app/types";
import { SidebarContext } from "@/app/context/sidebar_context";
import Slogan from "../texts/Slogan";

interface NavbarProps {
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <nav className="z-30 w-full text-center capitalize">
      {/* Logo and slogan container */}
      <div className="">
        <Logo />
        <Slogan />
      </div>

      {/* Lower nav menu bar */}
      <div className="lower-nav "></div>

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
    </nav>
  );
};
export default Navbar;
