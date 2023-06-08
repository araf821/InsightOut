import { FC } from "react";
import PostCard from "../PostCard";

interface DynamicPostContainerProps {}

const DynamicPostContainer: FC<DynamicPostContainerProps> = ({}) => {
  return (
    <div className="mt-4 flex flex-col gap-4 md:flex-row md:justify-between md: md:border md:border-neutral-200 md:p-2 md:shadow-lg lg:gap-8 lg:p-3 xl:p-4">
      <div className="h-full w-full">
        <PostCard main />
      </div>
      <div className="flex w-full max-w-[753px] h-fit flex-col gap-4">
        <PostCard horizontal />
        <PostCard horizontal />
      </div>
    </div>
  );
};

export default DynamicPostContainer;
