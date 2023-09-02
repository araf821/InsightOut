import { Comment, User } from "@prisma/client";
import { FC } from "react";
import Avatar from "../Avatar";
import { dateFormat } from "@/lib/helpers/dateFormat";

interface ReplyCommentProps {
  reply: Comment & { author: User };
}

const ReplyComment: FC<ReplyCommentProps> = ({ reply }) => {
  return (
    <div key={reply.id} className="flex gap-x-2.5 pt-4">
      <Avatar src={reply.author.image} classNames="w-10 md:w-12" />
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span>{reply.author.name}</span>
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
      </div>
    </div>
  );
};

export default ReplyComment;
