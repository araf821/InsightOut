import { Comment } from "@prisma/client";
import { FC } from "react";

interface PostCommentsProps {
  comments: Comment[];
}

const PostComments: FC<PostCommentsProps> = ({ comments }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Comment Input Section */}
        <div className="">

        </div>

      {/* Displaying Comments */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>hello</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
