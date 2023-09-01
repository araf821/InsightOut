"use client";

import { Comment, User } from "@prisma/client";
import { FC, useState } from "react";
import Avatar from "./Avatar";
import { dateFormat } from "@/lib/helpers/dateFormat";
import { Reply } from "lucide-react";
import { SafeUser } from "@/types";

interface IndividualCommentProps {
  comment: Comment & { author: User; replies: Comment[] };
  currentUser: SafeUser | null;
}

const IndividualComment: FC<IndividualCommentProps> = ({ comment }) => {
  const [open, setOpen] = useState(false);

  return (
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

        {open ? (
          <div></div>
        ) : (
          <div className="space-x-2">
            <Reply className=" h-5 w-5 text-zinc-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualComment;
