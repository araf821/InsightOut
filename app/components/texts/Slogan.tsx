import { FC } from "react";

interface SloganProps {}

const Slogan: FC<SloganProps> = ({}) => {
  return (
    <div
      className={`sm:text-md font-ubuntu text-sm text-zinc-800 md:text-lg lg:text-xl`}
    >
      Unleash Your Insights
    </div>
  );
};

export default Slogan;
