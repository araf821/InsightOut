"use client";

import { FC } from "react";
import { Post, User } from "@prisma/client";
import Button from "@/components/Button";
import { BsPenFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
  postsFromUser: (Post & { author: User })[] | null;
}

const DashboardClient: FC<DashboardClientProps> = ({ postsFromUser }) => {
  const router = useRouter();

  const published = postsFromUser?.filter((post) => post.published) ?? null;
  const drafts = postsFromUser?.filter((post) => !post.published) ?? null;

  if (!published?.length && !drafts?.length) {
    return (
      <div className="mx-auto my-20 grid w-full max-w-lg place-items-center space-y-6 rounded-md border-2 border-zinc-800 p-6">
        <p className="balance text-center text-sm md:text-base">
          Looks like you have not written any posts yet.
        </p>
        <Button
          onClick={() => router.push("/post/write")}
          label="Start Writing Now!"
          className="max-w-xs"
          icon={BsPenFill}
          outline
          small
        />
      </div>
    );
  }

  return <>{}</>;
};

export default DashboardClient;
