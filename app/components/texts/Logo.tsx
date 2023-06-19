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
      className={`max-w-min cursor-pointer select-none font-merri font-bold text-zinc-800 ${
        sidebar
          ? "text-[36px] sm:text-[44px] md:text-[50px] lg:text-5xl xl:text-[56px]"
          : "text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]"
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
