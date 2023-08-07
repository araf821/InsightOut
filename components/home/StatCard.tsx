import { FC } from "react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  type: string;
  className?: string;
}

const StatCard: FC<StatCardProps> = ({
  icon: Icon,
  value,
  type,
  className,
}) => {
  return (
    <div
      className={`${className} group relative w-full origin-center overflow-hidden rounded-md bg-transparent p-2 shadow-xl`}
    >
      {/* Background */}
      <div
        className={`moving-bg bg-gradient-to-br group-hover: absolute left-0 top-0 -z-10 h-full w-full rounded-md transition duration-300`}
      />

      {/* For future ref */}
      {/* <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-md bg-zinc-800 opacity-0 transition duration-300 group-hover:opacity-100"></div> */}

      {/* content */}
      <div className="flex gap-5 items-center rounded-md bg-transparent px-3 py-2 text-white transition duration-300">
          <span className="text-5xl">{Icon}</span>
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="font-josefin text-xl">{type}</p>{" "}
          </div>
      </div>
    </div>
  );
};

export default StatCard;
