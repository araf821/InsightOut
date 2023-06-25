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
      className={`max-w-min cursor-pointer translate-y-1 select-none font-josefin font-bold text-zinc-800 ${
        sidebar
          ? "text-[36px] sm:text-[44px] md:text-[50px] lg:text-5xl xl:text-[56px]"
          : "xl:[4rem] text-4xl sm:text-5xl lg:text-[3.5rem]"
      }`}
      onClick={() => {
        router.push("/");
        closeSidebar();
      }}
    >
      Insight
      <span className="text-accent">Out</span>
    </div>
  );
};
export default Logo;
