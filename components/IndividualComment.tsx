"use client";

import { Comment, User } from "@prisma/client";
import { FC, useState } from "react";
import Avatar from "./Avatar";
import { dateFormat } from "@/lib/helpers/dateFormat";
import { Reply, XCircle } from "lucide-react";
import { SafeUser } from "@/types";
import CommentForm from "./CommentForm";
import { commentSchema } from "@/app/post/[slug]/PostComments";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import ReplyComment from "./ReplyComment";

interface IndividualCommentProps {
  comment: Comment & { author: User; replies: (Comment & { author: User })[] };
  currentUser: SafeUser | null;
}

const IndividualComment: FC<IndividualCommentProps> = ({
  comment,
  currentUser,
}) => {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <div className="flex gap-x-2.5">
        <Avatar src={comment.author.image} classNames="w-10 md:w-12" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span>{comment.author.name}</span>
            <span className="text-sm text-zinc-500">
              {dateFormat(comment.createdAt.toISOString())}
            </span>
          </div>
          <p className="break-words text-zinc-800">{comment.content}</p>
          <div className="space-x-2">
            <Reply
              onClick={() => {
                if (!currentUser) {
                  return toast.error("Please sign in first.");
                }

                setOpen(true);
              }}
              className="h-5 w-5 cursor-pointer text-zinc-500 transition duration-200 hover:text-zinc-700"
            />
          </div>

          {/* Replies */}
          <div>
            {comment.replies.map((reply) => (
              <ReplyComment key={reply.id} reply={reply} />
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
