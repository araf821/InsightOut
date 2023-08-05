import { motion } from "framer-motion";
import { FC } from "react";

interface ConnectionsProps {}

const Connections: FC<ConnectionsProps> = ({}) => {
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
      className="relative flex h-full w-full cursor-not-allowed flex-col items-center justify-between gap-2 font-josefin text-neutral-800 md:flex-row lg:col-span-2 lg:flex-col"
    >
      <div className="absolute right-0 top-0 z-10 rounded-bl-md rounded-tr-md bg-secondary px-2 py-1 text-zinc-800 shadow-md md:text-base">
        Coming Soon
      </div>
      <div className="blur-sms grid h-full w-full items-center rounded-md bg-secondary px-6 opacity-50 shadow-md">
        <div className="flex translate-y-1 flex-row gap-8 py-4">
          <span className="text-xl md:text-2xl lg:text-3xl">0</span>
          <div className="border-l-2 border-neutral-300" />
          <span className="my-auto text-xl sm:text-2xl md:text-3xl">
            Followers
          </span>
        </div>
      </div>

      <div className="blur- m grid h-full w-full items-center rounded-md bg-secondary px-6 opacity-50 shadow-md">
        <div className="flex translate-y-1 flex-row gap-8 py-4 md:py-0">
          <span className="text-xl md:text-2xl lg:text-3xl">0</span>
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
