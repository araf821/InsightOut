"use client";

import Logo from "../texts/Logo";
import Container from "../Container";
import NavButtonsContainer from "./NavButtonsContainer";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav
      className={`z-30 w-full origin-top bg-bg text-center capitalize shadow-sm shadow-primary/30 transition`}
    >
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
