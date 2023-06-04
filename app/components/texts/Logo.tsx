"use client";
import { useRouter } from "next/navigation";
import { Yeseva_One } from "next/font/google";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/sidebar_context";

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
      className={`${
        yeseva.className
      } select-none max-w-min cursor-pointer text-5xl text-zinc-900 sm:text-6xl md:text-7xl lg:text-[5rem] ${
        sidebar === true &&
        "text-[36px] sm:text-[44px] md:text-[52px] lg:text-[52px] xl:text-[52px]"
      }`}
      onClick={() => {
        router.push("/");
        closeSidebar();
      }}
    >
        Insight<span className="text-rose-600">Out</span>
    </div>
  );
};
export default Logo;
