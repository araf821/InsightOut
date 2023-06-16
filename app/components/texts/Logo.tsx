"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/sidebar_context";

interface LogoProps {
  sidebar?: boolean;
}

const Logo: React.FC<LogoProps> = ({ sidebar }) => {
  const router = useRouter();
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <div
      tabIndex={0}
      className={`max-w-min cursor-pointer font-bold select-none font-merri text-5xl text-zinc-800 sm:text-6xl md:text-7xl lg:text-[5rem] ${
        sidebar === true &&
        "text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[56px]"
      }`}
      onClick={() => {
        router.push("/");
        closeSidebar();
      }}
    >
      Insight<span className="text-accent">Out</span>
    </div>
  );
};
export default Logo;
