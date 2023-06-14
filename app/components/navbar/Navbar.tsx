"use client";

import { useContext } from "react";
import Logo from "../texts/Logo";
import { SafeUser } from "@/app/types";
import { SidebarContext } from "@/app/context/sidebar_context";
import Slogan from "../texts/Slogan";
import Container from "../Container";
import NavButtonsContainer from "./NavButtonsContainer";

interface NavbarProps {
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { isOpen } = useContext(SidebarContext);

  return (
    <nav
      className={`${
        isOpen ? "translate-x-full md:translate-x-96 blur-sm duration-500" : ""
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
          <NavButtonsContainer />
        </Container>
      </div>
    </nav>
  );
};
export default Navbar;
