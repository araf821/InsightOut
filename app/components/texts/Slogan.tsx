import { FC } from "react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
});

interface SloganProps {}

const Slogan: FC<SloganProps> = ({}) => {
  return (
    <div
      className={`${nunito.className} sm:text-md text-sm text-zinc-800 md:text-lg lg:text-xl`}
    >
      Unleash Your Insights
    </div>
  );
};

export default Slogan;
