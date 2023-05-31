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
    <div className="z-50 w-full bg-[#1e2429] capitalize">
      <Container>
        <div className="flex flex-col items-center justify-center pb-9 pt-12 text-white">
          <Logo height={225} width={225} />
          {/* <UserMenu currentUser={currentUser} /> */}
          <p className="pt-1 font-semibold">More than just a blog</p>
        </div>
      </Container>

      {/* lower nav */}
      <div className="bg-slate-100">
        <Container>
          <div className="flex justify-between items-center">

          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
