"use client";

import { useContext } from "react";
import Logo from "../texts/Logo";
import { SafeUser } from "@/app/types";
import { SidebarContext } from "@/app/context/sidebar_context";
import Slogan from "../texts/Slogan";
import Container from "../Container";
import NavButton from "./NavButton";

import { FaSearch, FaPenFancy } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

interface NavbarProps {
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { openSidebar, isOpen } = useContext(SidebarContext);

  return (
    <nav
      className={`${
        isOpen ? "translate-x-36 blur-sm duration-500" : ""
      } z-30 w-full text-center capitalize transition`}
    >
      {/* Logo and slogan container */}
      <div className="grid place-items-center">
        <div className="mx-auto pb-2 pt-6">
          <Logo />
        </div>
        <Slogan />
      </div>

      {/* Lower nav menu bar */}
      <div className="lower-nav pt-2">
        <Container>
          <div className="flex items-center justify-center gap-3">
            <NavButton title="Discover" icon={FaSearch} onClick={openSidebar} />
            <NavButton title="Write" icon={FaPenFancy} onClick={openSidebar} />
            <NavButton
              title="Profile"
              icon={BsPersonFill}
              onClick={openSidebar}
            />
          </div>
        </Container>
      </div>

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
