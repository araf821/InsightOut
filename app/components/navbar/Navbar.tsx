"use client";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className=" bg-gray-800 w-full py-6">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3">
          <Logo />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
