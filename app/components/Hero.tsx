import { Pacifico } from "next/font/google";
import Image from "next/image";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <div className={`mx-auto flex max-w-[2520px] justify-center`}>
      {/* <div
        className="text relative flex aspect-video h-[100px] max-h-[250px]
        w-full flex-row items-center justify-center overflow-hidden text-center sm:h-[500px] lg:h-[20vw]"
        >
      </div> */}

      

    </div>
  );
};
export default Hero;
