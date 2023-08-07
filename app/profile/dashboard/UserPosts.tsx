"use client";

import { SafePost } from "@/app/types";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsPenFill } from "react-icons/bs";

interface UserPostsProps {
  published: SafePost[];
  drafts: SafePost[];
}

const DynamicPostCard = dynamic(() => import("@/components/PostCard"), {
  loading: () => (
    <div className="h-full w-full animate-pulse bg-neutral-400"></div>
  ),
  ssr: false,
});

const UserPosts: FC<UserPostsProps> = ({ published, drafts }) => {
  const router = useRouter();

  if (!drafts.length && !published.length) {
    return (
      <section className="flex w-full flex-col items-center gap-4 py-12 ">
        <div className="grid place-items-center space-y-4 rounded-md border-2 border-zinc-800 p-4">
          <p className="balance text-center font-josefin text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
            Looks like you have not written any posts yet.
          </p>
          <Button
            onClick={() => router.push("/post/write")}
            label="Start Writing Now!"
            className="max-w-[500px]"
            icon={BsPenFill}
            outline
          />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Displaying User's Posts */}
      {published.length > 0 ? (
        <>
          <Heading small center title="Published" />
          <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
            {published.map((post, index) => (
              <DynamicPostCard
                dashboard
                index={index}
                key={post.id}
                post={post}
              />
            ))}
          </section>
        </>
      ) : null}

      {drafts.length > 0 ? (
        <>
          <Heading small center title="Drafts" />
          <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((post, index) => (
              <DynamicPostCard
                dashboard
                index={index}
                key={post.id}
                post={post}
              />
            ))}
          </section>
        </>
      ) : null}
    </>
  );
};

export default UserPosts;
