"use client";

import { FC } from "react";
import Logo from "./texts/Logo";
import FooterLink from "./FooterLink";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const router = useRouter();

  return (
    <motion.footer className="mx-auto max-w-[1536px] selection:bg-bg selection:text-zinc-800 2xl:px-20">
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
            scaleX: 0.3,
            transition: {
              type: "spring",
            },
          },
          show: {
            opacity: 1,
            y: 0,
            scaleX: 1,
            transition: {
              duration: 0.4,
              type: "tween",
              delay: 0.1,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        className="flex flex-col items-center justify-center gap-8 bg-zinc-800 py-16  2xl:rounded-xl"
      >
        <Logo footer />
        <div className="buttons mx-auto flex flex-col gap-3 text-center text-bg/80 sm:flex-row sm:gap-12 lg:gap-20 xl:gap-24 2xl:gap-28">
          <FooterLink label="Home" link={() => router.push("/")} />
          <FooterLink label="About" link={() => router.push("/about")} />
          <FooterLink label="Contact" link={() => router.push("/contact")} />
          <FooterLink label="Help" link={() => router.push("/help")} />
        </div>
        <div className="social-links mx-auto flex gap-6 text-center text-bg sm:gap-12">
          <FaTwitter className="cursor-pointer text-3xl transition duration-200 hover:rotate-12 hover:scale-105 active:scale-90 md:text-4xl" />
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/araf821/Blog-Site"
          >
            <FaGithub
              // below code does not seem to work, sending infinite requests to github
              // onClick={() => {
              //   router.push("https://github.com/araf821/Blog-Site");
              // }}
              className="cursor-pointer text-3xl transition duration-200 hover:rotate-12 hover:scale-105 active:scale-90 md:text-4xl"
            />
          </Link>
          <FaInstagram className="cursor-pointer text-3xl transition duration-200 hover:rotate-12 hover:scale-105 active:scale-90 md:text-4xl" />
        </div>
        <Link
          href="https://www.buymeacoffee.com/araf821"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mx-auto -mb-6 h-12 w-44 lg:h-16"
        >
          <Image
            src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
            alt="Buy Me A Coffee"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </Link>
        <p className="-mb-8 mt-8 text-center font-josefin text-sm text-bg md:text-base">
          Copyright @{new Date().getFullYear()} All Rights Reserved | Made with
          🍌
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
