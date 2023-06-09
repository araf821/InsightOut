"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/sidebar_context";

import { Yeseva_One } from "next/font/google";

const yeseva = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
});

interface LogoProps {
  sidebar?: boolean;
}

const Logo: React.FC<LogoProps> = ({ sidebar }) => {
  const router = useRouter();
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <div
      className={`max-w-min cursor-pointer select-none font-yeseva text-5xl text-zinc-800 sm:text-6xl md:text-7xl lg:text-[5rem] ${
        sidebar === true &&
        "text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[56px]"
      }`}
      onClick={() => {
        router.push("/");
        closeSidebar();
      }}
    >
      Insight<span className="text-[#ff804a]">Out</span>
    </div>
  );
};
export default Logo;
