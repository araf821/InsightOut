"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="site logo"
      className="cursor-pointer"
      height="150"
      width="150"
      src='/images/LOGO.png'
    />
  );
};
export default Logo;
