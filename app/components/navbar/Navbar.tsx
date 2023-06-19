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
    <nav className={`z-30 w-full text-center capitalize shadow-md shadow-primary/30 transition`}>
      {/* Logo and slogan container */}
      <div className="grid place-items-center">
        <div className="mx-auto pb-2 pt-6">
          <Logo />
        </div>
        {/* <Slogan /> */}
      </div>

      {/* Lower nav menu bar */}
      <div className="lower-nav py-4">
        <Container>
          <NavButtonsContainer />
        </Container>
      </div>
    </nav>
  );
};
export default Navbar;
