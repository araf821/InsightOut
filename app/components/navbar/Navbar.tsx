"use client";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed bg-gray-800 w-full py-6">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3">
          <Logo />
          <UserMenu />
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
