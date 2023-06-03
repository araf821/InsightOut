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
    // <Image
    //   onClick={() => router.push("/")}
    //   alt="site logo"
    //   className="cursor-pointer"
    //   height={height}
    //   width={width}
    //   src="/images/app-logo.png"
    // />
    <div
      className={`${yeseva.className} mt-6 mb-2 text-4xl text-zinc-900 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl`}
      onClick={() => router.push("/")}
    >
      Insight<span className="text-rose-500">Out</span>
    </div>
  );
};
export default Logo;
