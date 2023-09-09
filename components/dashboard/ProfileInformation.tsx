"use client";

import Connections from "@/app/profile/dashboard/Connections";
import { dateFormat } from "@/lib/helpers/dateFormat";
import { Connection, User } from "@prisma/client";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "../Heading";

interface ProfileInformationProps {
  user: User & {
    _count: { posts: number };
  };
  followers: ({ follower: User | null } & { isFollowed: boolean })[];
  following: { following: User | null }[];
}

const ProfileInformation: FC<ProfileInformationProps> = ({
  user,
  followers,
  following,
}) => {
  const router = useRouter();

  return (
    <>
      <Heading title="Dashboard" />
      <div className="my-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Author Info */}
        <motion.div
          viewport={{ once: true }}
          variants={{
            hidden: {
              opacity: 0,
              x: -100,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 500,
              },
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 200,
              },
            },
          }}
          whileInView="show"
          initial="hidden"
          className="relative flex w-full flex-col overflow-hidden rounded-t-lg bg-secondary px-2 py-3 shadow-md sm:flex-row sm:rounded-l-lg lg:col-span-3"
        >
          <div className="relative  aspect-square w-full sm:max-w-[200px] md:h-[200px]">
            <Image
              src={user.image || "/images/placeholder.jpg"}
              alt="current user profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-2 pt-4 font-josefin sm:px-2 sm:py-0">
            <div className="flex items-center justify-between">
              <span className="font-merri text-2xl font-semibold">
                {user.name}
              </span>
              <motion.span
                onClick={() => router.push("/profile/settings")}
                whileHover={{ scale: 1.1, color: "black" }}
                className="cursor-pointer text-xl text-neutral-600"
              >
                <Edit />
              </motion.span>
            </div>
            <hr className="border-neutral-300" />
            <p className="text-xl font-light">
              Member Since: {dateFormat(user.createdAt.toISOString())}
            </p>
            <p className="text-xl font-light">
              Posts published: {user._count.posts}
            </p>
          </div>
        </motion.div>

        {/* Followers/Following Section*/}
        <Connections following={following} followers={followers} />
      </div>
      <motion.hr
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.3 } }}
      />
    </>
  );
};

export default ProfileInformation;
