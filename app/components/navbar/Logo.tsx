"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  height: number;
  width: number;
}

const Logo: React.FC<LogoProps> = ({ height, width }) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="site logo"
      className="cursor-pointer"
      height={height}
      width={width}
      src="/images/app-logo.png"
    />
  );
};
export default Logo;
