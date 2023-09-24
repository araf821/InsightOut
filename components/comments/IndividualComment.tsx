"use client";

import { Comment, User } from "@prisma/client";
import { FC, useState } from "react";
import Avatar from "../Avatar";
import { dateFormat } from "@/lib/helpers/dateFormat";
import { Reply, Trash } from "lucide-react";
import CommentForm from "./CommentForm";
import { commentSchema } from "./PostComments";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import IndividualReply from "./IndividualReply";

interface IndividualCommentProps {
  comment: Comment & { author: User; replies: (Comment & { author: User })[] };
  currentUser: User | null;
}

const IndividualComment: FC<IndividualCommentProps> = ({
  comment,
  currentUser,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      if (!currentUser) {
        return toast.error("Please sign in first.");
      }

      await axios.patch(`/api/comments/reply/${comment.id}`, {
        ...data,
        postId: comment.postId,
      });

      toast.success("Reply has been added!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const onDelete = async () => {
    setIsLoading(true);

    try {
      if (!currentUser) {
        return toast.error("Please sign in.");
      }

      await axios.patch(`/api/comments/delete`, { commentId: comment.id });

      toast("Comment has been deleted.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-x-2.5">
        <div className="flex flex-col items-center gap-4">
          <Avatar src={comment.author.image} classNames="w-10 md:w-12" />
          <div className="h-full border-r-[1px] border-zinc-300" />
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="cursor-pointer text-zinc-700 transition hover:text-zinc-900"
              tabIndex={0}
              onClick={() =>
                router.push(`/user/${comment.authorId}`, { scroll: true })
              }
            >
              {comment.author.name}
            </span>
            <span className="text-sm text-zinc-500">
              {dateFormat(comment.createdAt.toISOString())}
            </span>
          </div>
          <p className="break-words text-zinc-800">
            {comment.deleted ? (
              <span className="font-bold text-zinc-500">[deleted]</span>
            ) : (
              comment.content
            )}
          </p>
          <div className="flex items-center gap-1.5">
            <Reply
              onClick={() => {
                if (!currentUser) {
                  return toast.error("Please sign in first.");
                }

                setOpen(true);
              }}
              aria-label="comment reply button"
              className="h-5 w-5 cursor-pointer text-zinc-500 transition duration-200 hover:text-zinc-700"
            />
            {currentUser?.id === comment.authorId && !comment.deleted && (
              <button
                aria-label="comment delete button"
                disabled={isLoading}
                onClick={onDelete}
                className="cursor-pointer text-zinc-500 transition duration-200 hover:text-rose-600 disabled:opacity-60"
              >
                <Trash className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Replies */}
          <div>
            {comment.replies.map((reply) => (
              <IndividualReply
                key={reply.id}
                currentUser={currentUser}
                reply={reply}
              />
            ))}
          </div>

          {open && currentUser ? (
            <div className="mt-4">
              <CommentForm currentUser={currentUser} onSubmit={onSubmit} />
            </div>
          ) : null}
        </div>
      </div>
      <hr className="w-full bg-black text-black" />
    </>
  );
};

export default IndividualComment;
