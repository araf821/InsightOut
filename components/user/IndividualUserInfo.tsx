"use client";

import { dateFormat } from "@/lib/helpers/dateFormat";
import { Connection, Post, User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import { redirect, useRouter } from "next/navigation";

interface IndividualUserInfoProps {
  user: User & {
    posts: Post[];
  };
  followers: { follower: User | null }[];
  following: { following: User | null }[];
  currentUser: User | null;
}

const IndividualUserInfo: FC<IndividualUserInfoProps> = ({
  currentUser,
  user,
  followers,
  following,
}) => {
  const { onOpen } = useModal();
  const router = useRouter();

  // if (currentUser?.id === user.id) {
  //   redirect("/profile/dashboard");
  // }

  const alreadyFollowing = followers.find((follower) => {
    return follower.follower?.id === currentUser?.id;
  });

  const handleUserConnection = async () => {
    if (!currentUser) {
      return toast.error("Please sign in first.");
    }

    try {
    } catch (error: any) {
      if (error?.response?.status === 403) {
        return;
      }
    }
  };

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
            <button
              onClick={handleUserConnection}
              className="w-fit rounded-sm bg-zinc-200 px-2 py-1.5 text-left text-zinc-700 transition hover:bg-zinc-300 hover:text-zinc-900"
            >
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

      {/* Followers Modal */}
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-2 font-josefin text-zinc-500 md:flex-row lg:col-span-2 lg:flex-col">
        <div
          onClick={() => onOpen("followersModal", {followers})}
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

        {/* Following Modal */}
        <div
          onClick={() => onOpen("followingModal", { following })}
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
