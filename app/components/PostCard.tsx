import Image from "next/image";
import { FC } from "react";
import { SafePost } from "../types";

interface PostCardProps {
  main?: boolean;
  horizontal?: boolean;
  post?: SafePost;
}

const PostCard: FC<PostCardProps> = ({ post = null, horizontal, main }) => {
  if (!post) return null;

  return (
    <div
      className={`w-full max-w-[800px] ${
        horizontal &&
        "md:flex md:h-full md:min-w-[350px] md:flex-grow lg:min-w-[500px]"
      }`}
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:shadow-zinc-500">
        <Image
          src={post.image}
          fill
          alt=""
          className="absolute rounded-lg object-cover"
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
          className={`font-josefin text-2xl font-bold ${
            horizontal && "md:text-xl lg:text-[26px] xl:text-3xl"
          }
          ${main && "lg:text-[26px] xl:text-3xl"}`}
        >
          <span className="cursor-pointer underline-offset-4 hover:underline">
            {post.title}
          </span>
        </p>
        {post ? (
          <p className={`text-lg font-light ${horizontal && "xl:text-xl"}`}>
            {post.author.name}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
