import { Pacifico } from "next/font/google";
import Image from "next/image";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <div
      className={`mx-auto flex max-w-[2520px] justify-center ${pacifico.className}`}
    >
      <div
        className="text relative flex aspect-video h-[100px] max-h-[250px]
        w-full flex-row items-center justify-center overflow-hidden text-center sm:h-[500px] lg:h-[20vw]"
      >
        <div className="z-10 select-none p-6 text-3xl tracking-wider text-zinc-800 sm:rounded-xl sm:text-5xl lg:text-6xl xl:text-7xl">
          Unleash Your Insights
        </div>
        <Image
          fill
          src="/images/hero-bg.jpg"
          alt="blog background"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};
export default Hero;
