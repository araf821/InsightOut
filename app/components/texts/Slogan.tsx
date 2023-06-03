import { FC } from "react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["400", "700", "300"],
  subsets: ["latin"],
});

interface SloganProps {}

const Slogan: FC<SloganProps> = ({}) => {
  return (
    <div
      className={`${nunito.className} text-zinc-800 sm:text-md text-sm font-[700] md:text-lg lg:text-xl `}
    >
      Unleash Your Insights
    </div>
  );
};

export default Slogan;
