import { useModal } from "@/hooks/useModal";
import { Connection, User } from "@prisma/client";
import { motion } from "framer-motion";
import { FC } from "react";
import { toast } from "react-hot-toast";

interface ConnectionsProps {
  following: { following: User | null }[];
  followers: { follower: User | null }[];
}

const Connections: FC<ConnectionsProps> = ({ followers, following }) => {
  const { onOpen } = useModal();

  return (
    <motion.div
      viewport={{ once: true }}
      variants={{
        hidden: {
          opacity: 0,
          x: 100,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 505,
          },
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            delay: 0.2,
          },
        },
      }}
      whileInView="show"
      initial="hidden"
      className="relative flex h-full w-full flex-col items-center justify-between gap-2 font-josefin text-zinc-500 md:flex-row lg:col-span-2 lg:flex-col"
    >
      <div
        onClick={() => onOpen("followersModal", { followers })}
        className="group grid h-full w-full cursor-pointer items-center rounded-md bg-secondary px-6 shadow-md transition hover:text-zinc-600"
      >
        <div className="flex translate-y-1 flex-row gap-8 py-4">
          <span className="text-xl md:text-2xl lg:text-3xl">
            {followers?.length ?? "0"}
          </span>
          <div className="border-l-2 border-neutral-300" />
          <span className="my-auto text-xl sm:text-2xl md:text-3xl">
            Followers
          </span>
        </div>
      </div>

      <div
        onClick={() => {
          toast.error("Under Construction");
        }}
        className="group grid h-full w-full cursor-pointer items-center rounded-md bg-secondary px-6 shadow-md transition hover:text-zinc-600"
      >
        <div className="flex translate-y-1 flex-row gap-8 py-4 md:py-0">
          <span className="text-xl md:text-2xl lg:text-3xl">
            {following?.length ?? 0}
          </span>
          <div className="border-l-2 border-neutral-300" />
          <span className="my-auto text-xl sm:text-2xl md:text-3xl">
            Following
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Connections;
