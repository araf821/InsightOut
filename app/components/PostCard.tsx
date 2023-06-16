import Image from "next/image";
import { FC } from "react";
import { SafePost } from "../types";

interface PostCardProps {
  main?: boolean;
  horizontal?: boolean;
  post: SafePost;
}

const PostCard: FC<PostCardProps> = ({ post, horizontal, main }) => {
  return (
    <div
      className={`w-full max-w-[800px] ${
        horizontal &&
        "md:flex md:h-full md:min-w-[350px] md:flex-grow lg:min-w-[500px]"
      }`}
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={post.image}
          fill
          alt=""
          className="absolute rounded-lg object-cover transition-transform duration-1000 ease-out hover:scale-125"
        />
      </div>

      {/* Post Info */}
      <div
        className={`h-full w-full p-2 text-center capitalize ${
          horizontal &&
          "md:my-auto md:h-fit md:space-y-3 md:p-0 md:pl-2 md:text-start"
        }`}
      >
        <p
          className={`font-ubuntu text-2xl font-bold ${
            horizontal && "md:text-xl lg:text-[26px] xl:text-3xl"
          }
          ${main && "lg:text-[26px] xl:text-3xl"}`}
        >
          <span className="cursor-pointer underline-offset-4 hover:underline">
            {post.title}
          </span>
        </p>
        <p className={`text-lg font-light ${horizontal && "xl:text-xl"}`}>
          {post.author.name}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
