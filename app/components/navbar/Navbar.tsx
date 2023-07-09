"use client";

import Logo from "../texts/Logo";
import Container from "../Container";
import NavButtonsContainer from "./NavButtonsContainer";
import { motion } from "framer-motion";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <motion.nav
      variants={{
        hidden: {
          opacity: 0,
          y: -50,
          transition: {
            type: "spring",
          },
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            delay: 0.1,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      className={`z-30 w-full origin-top bg-bg text-center capitalize shadow-md`}
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
    </motion.nav>
  );
};
export default Navbar;
