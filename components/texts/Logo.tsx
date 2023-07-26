"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/sidebar_context";

interface LogoProps {
  sidebar?: boolean;
  footer?: boolean;
}

const Logo: React.FC<LogoProps> = ({ sidebar, footer }) => {
  const router = useRouter();
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <div
      tabIndex={0}
      className={`max-w-min translate-y-1 cursor-pointer select-none font-josefin font-bold ${
        sidebar
          ? "text-[36px] md:text-[50px]"
          : "xl:[4rem] text-4xl sm:text-5xl lg:text-[3.5rem]"
      } ${footer ? "text-bg" : "text-zinc-800"}`}
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
