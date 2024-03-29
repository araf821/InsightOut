"use client";

import { Comment, User } from "@prisma/client";
import { FC, useState } from "react";
import Avatar from "../Avatar";
import { dateFormat } from "@/lib/helpers/dateFormat";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IndividualReplyProps {
  reply: Comment & { author: User };
  currentUser: User | null;
}

const IndividualReply: FC<IndividualReplyProps> = ({ reply, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setIsLoading(true);

    try {
      if (!currentUser) {
        return toast.error("Please sign in.");
      }

      await axios.patch(`/api/comments/delete`, { commentId: reply.id });

      toast("Reply has been deleted.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div key={reply.id} className="flex gap-x-2.5 pt-4">
      <div className="relative">
        <div className="absolute -left-5 top-4 w-3 border-b-2 border-neutral-300 sm:top-6 sm:w-4 md:-left-6" />
        <Avatar src={reply.author.image} classNames="w-10 md:w-12" />
      </div>
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span
            onClick={() => router.push(`/user/${reply.authorId}`)}
            className="cursor-pointer text-zinc-700 transition hover:text-zinc-900"
          >
            {reply.author.name}
          </span>
          <span className="text-sm text-zinc-500">
            {dateFormat(reply.createdAt.toISOString())}
          </span>
        </div>
        <p className="break-words text-zinc-800">
          {reply.deleted ? (
            <span className="font-bold text-zinc-500">[deleted]</span>
          ) : (
            reply.content
          )}
        </p>

        {currentUser?.id === reply.authorId && !reply.deleted && (
          <button
            aria-label="reply delete button"
            disabled={isLoading}
            onClick={onDelete}
            className="w-fit cursor-pointer text-zinc-500 transition duration-200 hover:text-rose-600 disabled:opacity-60"
          >
            <Trash className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IndividualReply;
