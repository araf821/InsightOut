"use client";

import { FC } from "react";
import Container from "./Container";
import Logo from "./texts/Logo";
import FooterLink from "./FooterLink";
import { FaAirbnb, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const router = useRouter();

  return (
    <Container>
      <motion.footer
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
            transition: {
              type: "tween",
              stiffness: 300,
              damping: 10,
            },
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              stiffness: 80,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        className="flex w-full flex-col items-center justify-center gap-8 rounded-xl bg-zinc-800 px-4 py-16 selection:bg-bg selection:text-zinc-800"
      >
        <Logo footer />
        <div className="buttons mx-auto flex flex-col gap-3 text-center text-bg/80 sm:flex-row sm:gap-12">
          <FooterLink label="Home" link={() => router.push("/")} />
          <FooterLink label="About" link={() => {}} />
          <FooterLink label="Contact" link={() => {}} />
          <FooterLink label="Careers" link={() => router.push("/careers")} />
        </div>
        <div className="social-links mx-auto flex gap-6 text-center text-bg sm:gap-12">
          <FaTwitter className="cursor-pointer text-3xl transition duration-200 hover:rotate-12 hover:scale-105 md:text-4xl" />
          <FaGithub
            onClick={() => {
              router.push("https://airbee-enbee.vercel.app");
            }}
            className="cursor-pointer text-3xl transition duration-200 hover:rotate-12 hover:scale-105 md:text-4xl"
          />
          <FaInstagram className="cursor-pointer text-3xl transition duration-200 hover:rotate-12 hover:scale-105 md:text-4xl" />
        </div>
        <p className="-mb-8 mt-8 text-center text-sm text-bg">
          Copyright @{new Date().getFullYear()} All Rights Reserved | Made with
          🍌
        </p>
      </motion.footer>
    </Container>
  );
};

export default Footer;
