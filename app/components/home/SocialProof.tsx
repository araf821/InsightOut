import { FC } from "react";
import { IconType } from "react-icons";

interface SocialProofProps {
  icon: IconType;
  followers: string;
  type: string;
}

const SocialProof: FC<SocialProofProps> = ({ icon: Icon, followers, type }) => {
  return (
    <div className="relative z-10 flex w-full md:w-fit gap-8 rounded-lg bg-primary px-6 py-3 outline outline-4 outline-bg">
      <span className="absolute left-2 top-2 -z-10 h-full w-full rounded-md bg-primary"></span>
      <Icon className="text-7xl" />
      <div className="flex flex-col justify-center">
        <p className="text-2xl">{followers}</p>
        <p className="text-xl">{type}</p>
      </div>
    </div>
  );
};

export default SocialProof;
