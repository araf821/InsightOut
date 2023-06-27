import { FC } from "react";
import { IconType } from "react-icons";

interface SocialProofProps {
  icon: IconType;
  followers: string;
  type: string;
  className?: string;
}

const SocialProof: FC<SocialProofProps> = ({
  icon: Icon,
  followers,
  type,
  className,
}) => {
  return (
    <div
      className={`group relative z-10 flex w-full gap-8 rounded-lg bg-primary px-6 py-3 shadow-lg shadow-primary outline outline-4 outline-bg ${className}`}
    >
      <span className="absolute left-2 top-2 -z-20 h-full w-full rounded-md bg-primary transition-transform duration-300 group-hover:-translate-x-4 group-hover:-translate-y-4"></span>
      <Icon className="text-7xl" />
      <div className="flex flex-col justify-center">
        <p className="text-2xl font-semibold">{followers}</p>
        <p className="text-xl">{type}</p>
      </div>
    </div>
  );
};

export default SocialProof;
