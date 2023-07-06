"use client";

import Image from "next/image";
import { FC } from "react";
import { SafePost } from "../types";
import { useRouter } from "next/navigation";
import Button from "./Button";
import DeleteModal from "./modals/DeleteModal";

interface PostCardProps {
  main?: boolean;
  horizontal?: boolean;
  post?: SafePost;
  dashboard?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  post = null,
  horizontal,
  main,
  dashboard,
}) => {
  const router = useRouter();

  if (!post) return null;

  const handleDelete = () => {};

  return (
    <div
      className={`w-full max-w-[800px] transition duration-500 ${
        horizontal &&
        "md:flex md:h-full md:min-w-[350px] md:flex-grow lg:min-w-[500px]"
      } ${dashboard && "flex flex-col justify-between"}`}
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg shadow-sm transition duration-300">
        <Image
          src={post.image}
          fill
          alt=""
          className="absolute rounded-lg object-cover"
        />
      </div>

      {/* Post Info */}
      <div
        className={`h-fit w-full p-2 text-center capitalize ${
          horizontal &&
          "md:my-auto md:h-fit md:space-y-3 md:p-0 md:pl-2 md:text-start"
        }`}
      >
        <p
          className={`font-josefin text-2xl font-bold ${
            horizontal && "md:text-xl lg:text-[26px] xl:text-3xl"
          }
          ${main && "lg:text-[26px] xl:text-3xl"}`}
          onClick={() => router.push(`/post/${post.slug}`)}
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

      {dashboard && (
        <div className="z-10 flex w-full flex-col items-end gap-1">
          <Button label="Delete post" outline small onClick={() => {}} />
          {post.published ? (
            <Button
              label="Save as draft"
              outline
              small
              onClick={() => {
                handleDelete();
              }}
            />
          ) : (
            <Button label="Move to Drafts" outline small onClick={() => {}} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
