"use client";

import { dateFormat } from "@/lib/helpers/dateFormat";
import { SafePost } from "@/types";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
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
          <div className="relative  aspect-square w-full sm:max-w-[200px] md:h-[200px]">
            <Image
              src={userImage || "/images/placeholder.jpg"}
              alt="current user profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
