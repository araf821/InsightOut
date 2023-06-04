"use client";
import { useRouter } from "next/navigation";
import { Yeseva_One } from "next/font/google";

const yeseva = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
});

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className={`${yeseva.className} mb-2 mt-6 select-none text-5xl text-zinc-900 sm:text-6xl md:text-7xl lg:text-[5rem]`}
      onClick={() => router.push("/")}
    >
      Insight<span className="text-rose-600">Out</span>
    </div>
  );
};
export default Logo;
