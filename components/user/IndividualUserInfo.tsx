"use client";

import { dateFormat } from "@/lib/helpers/dateFormat";
import { Connection, Post, User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface IndividualUserInfoProps {
  user: User & {
    followers: Connection[];
    following: Connection[];
    posts: Post[];
  };
  currentUser: User | null;
}

const IndividualUserInfo: FC<IndividualUserInfoProps> = ({
  currentUser,
  user,
}) => {
  const alreadyFollowing = user.followers.find((follower) => {
    return follower.followerId === currentUser?.id;
  });

  return (
    <div className="my-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className="relative flex w-full flex-col overflow-hidden rounded-t-lg bg-secondary px-2 py-3 shadow-md sm:flex-row sm:rounded-l-lg lg:col-span-3">
        <div className="relative aspect-square w-full max-w-[200px]">
          <Image
            alt="user image"
            fill
            src={user.image || ""}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2 pt-4 font-josefin sm:px-2 sm:py-0">
          <div className="flex items-center justify-between">
            <span className="font-merri text-2xl font-semibold">
              {user.name}
            </span>
            <button className="w-fit rounded-sm bg-zinc-200 px-2 py-1.5 text-left text-zinc-700 transition hover:bg-zinc-300 hover:text-zinc-900">
              {alreadyFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
          <hr className="border-neutral-300" />
          <p className="text-xl font-light">
            Member Since: {dateFormat(user.createdAt.toISOString())}
          </p>
          <p className="text-xl font-light">Posts published: 0</p>
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-between gap-2 font-josefin text-zinc-500 md:flex-row lg:col-span-2 lg:flex-col">
        <div
          onClick={() => {}}
          className="group grid h-full w-full cursor-pointer items-center rounded-md bg-secondary px-6 shadow-md transition hover:text-zinc-600"
        >
          <div className="flex translate-y-1 flex-row gap-8 py-4">
            <span className="text-xl md:text-2xl lg:text-3xl">0</span>
            <div className="border-l-2 border-neutral-300" />
            <span className="my-auto text-xl sm:text-2xl md:text-3xl">
              Followers
            </span>
          </div>
        </div>

        <div
          onClick={() => {}}
          className="group grid h-full w-full cursor-pointer items-center rounded-md bg-secondary px-6 shadow-md transition hover:text-zinc-600"
        >
          <div className="flex translate-y-1 flex-row gap-8 py-4 md:py-0">
            <span className="text-xl md:text-2xl lg:text-3xl">
              {/* {following?.length ?? 0} */}0
            </span>
            <div className="border-l-2 border-neutral-300" />
            <span className="my-auto text-xl sm:text-2xl md:text-3xl">
              Following
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualUserInfo;
