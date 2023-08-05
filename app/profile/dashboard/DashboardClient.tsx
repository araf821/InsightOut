"use client";

import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost } from "@/app/types";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsPenFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import Connections from "./Connections";
import UserPosts from "./UserPosts";

interface DashboardClientProps {
  postsFromUser: SafePost[];
  userName: string | null;
  userCreated: string;
  userImage: string | null;
}

const DashboardClient: FC<DashboardClientProps> = ({
  postsFromUser,
  userName,
  userCreated,
  userImage,
}) => {
  const router = useRouter();

  const published = postsFromUser.filter((post) => post.published);
  const drafts = postsFromUser.filter((post) => !post.published);

  return (
    <section className="py-8">
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
          {/* <motion.span
            whileHover={{ scale: 1.2, opacity: 1 }}
            
            className="group absolute right-1 top-2 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-xl sm:top-1"
          >
            <FaUserEdit className="text-2xl text-neutral-200 opacity-80 sm:text-neutral-800" />
          </motion.span> */}
          {/* Image component */}
          <div className="relative  aspect-square w-full sm:max-w-[200px] md:h-[200px]">
            <Image
              src={userImage || "/images/placeholder.jpg"}
              alt="current user profile"
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-2 pt-4 font-josefin sm:px-2 sm:py-0">
            <div className="flex items-center justify-between">
              <span className="font-merri text-2xl font-semibold">
                {userName}
              </span>
              <motion.span
                onClick={() => router.push("/profile/settings")}
                whileHover={{ scale: 1.4, color: "black" }}
                className="cursor-pointer text-xl text-neutral-600"
              >
                <FaUserEdit />
              </motion.span>
            </div>
            <hr className="border-neutral-300" />
            <p className="text-xl font-light">
              Member Since: {dateFormat(userCreated)}
            </p>
            <p className="text-xl font-light">
              Posts published:{" "}
              {postsFromUser.filter((post) => post.published).length}
            </p>
          </div>
        </motion.div>

        {/* Followers/Following Section*/}
        <Connections />
      </div>

      <UserPosts published={published} drafts={drafts} />
    </section>
  );
};

export default DashboardClient;
