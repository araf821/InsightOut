"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import MoreOptionsMenu from "../MoreOptionsMenu";
import { motion } from "framer-motion";
import { SafePost } from "@/types";
import { postCardVariants } from "@/lib/anim";
import { Post, User } from "@prisma/client";
import { dateFormat } from "@/lib/helpers/dateFormat";

interface PostCardProps {
  main?: boolean;
  horizontal?: boolean;
  post?: Post & { author: User };
  dashboard?: boolean;
  index?: number;
}

const PostCard: FC<PostCardProps> = ({
  post = null,
  horizontal,
  main,
  dashboard,
  index = 0,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!post) return null;

  const handleDelete = () => {
    setIsLoading(true);

    axios
      .delete(`/api/post/${post.id}`)
      .then(() => {
        toast.error("Post deleted!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleMove = () => {
    setIsLoading(true);

    axios
      .put(`/api/post/${post.id}`)
      .then(() => {
        toast.success(`${post.published ? "Moved to drafts!" : "Published!"}`);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <motion.div
      variants={postCardVariants(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`post-card w-full max-w-[800px] ${
        horizontal &&
        "md:flex md:h-full md:min-w-[350px] md:flex-grow lg:min-w-[500px]"
      }`}
    >
      <div
        className={`relative aspect-[3/2] w-full overflow-hidden rounded-sm shadow-sm`}
      >
        <Image
          src={post.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="post image"
          className={`absolute border rounded-sm object-cover`}
        />
        {dashboard && (
          <MoreOptionsMenu
            post={post}
            onMove={handleMove}
            onDelete={handleDelete}
            isLoading={isLoading}
            onUpdate={() => {
              router.push(`/post/update/${post.slug}`);
            }}
          />
        )}
      </div>

      {/* Post Info */}
      <div
        className={`h-fit w-full space-y-0.5 py-2 capitalize ${
          horizontal && "md:h-fit md:p-0 md:pl-2"
        }`}
      >
        {!horizontal && !main && (
          <span className="text-sm text-zinc-600">
            {dateFormat(post.createdAt.toISOString())}
          </span>
        )}
        <p
          className={`font-josefin text-xl font-bold lg:text-[1.35rem] xl:text-2xl
          ${(main || horizontal) && "md:text-xl xl:text-2xl"}`}
          onClick={() => router.push(`/post/${post.slug}`)}
        >
          <span className="cursor-pointer underline-offset-4 hover:underline">
            {post.title}
          </span>
        </p>
        <p className={`font-light text-zinc-700`}>{post.author.name}</p>
      </div>
    </motion.div>
  );
};

export default PostCard;

export const PostCardLoader = () => {
  return (
    <motion.div className={`w-full max-w-[800px]`}>
      <div
        className={`relative aspect-[5/4] w-full overflow-hidden rounded-lg shadow-sm`}
      ></div>

      <div className={`h-fit w-full p-2 text-center capitalize `}>
        <p className={``}>
          <span className="cursor-pointer underline-offset-4 hover:underline"></span>
        </p>
      </div>
    </motion.div>
  );
};
