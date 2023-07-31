"use client";

import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost } from "@/app/types";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsPenFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";

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
          <span
            onClick={() => router.push("/profile/settings")}
            className="group absolute right-1 top-2 z-10 grid h-12 w-12 cursor-pointer place-items-center sm:top-1"
          >
            <FaUserEdit className="text-2xl text-neutral-200 opacity-80 transition group-hover:scale-110 group-hover:opacity-100 sm:text-neutral-800" />
          </span>
          {/* Image component */}
          <div className="relative  aspect-square w-full sm:max-w-[200px] md:h-[200px]">
            <Image
              //@ts-ignore
              src={userImage || "/images/placeholder.jpg"}
              alt="current user profile"
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-2 pt-4 font-josefin sm:px-2 sm:py-0">
            <p className="font-merri text-2xl font-semibold">{userName}</p>
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
      </div>

      {/* Displaying User's Posts */}
      {published.length > 0 && (
        <>
          <Heading small center title="Published" />
          <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
            {published.map((post, index) => (
              <PostCard dashboard index={index} key={post.id} post={post} />
            ))}
          </section>
        </>
      )}

      {drafts.length > 0 && (
        <>
          <Heading small center title="Drafts" />
          <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((post, index) => (
              <PostCard dashboard index={index} key={post.id} post={post} />
            ))}
          </section>
        </>
      )}

      {!drafts.length && !published.length && (
        <section className="flex w-full flex-col items-center gap-4 py-12 ">
          <p className="font-josefin text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
            Looks like you have not written any posts yet.
          </p>
          <Button
            onClick={() => {}}
            label="Start Writing Now!"
            className="max-w-[500px]"
            icon={BsPenFill}
            outline
          />
        </section>
      )}
    </section>
  );
};

export default DashboardClient;
