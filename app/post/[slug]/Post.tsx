"use client";

import Heading from "@/app/components/Heading";
import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface PostProps {
  post: SafePost;
}

const Post: FC<PostProps> = ({ post }) => {
  const router = useRouter();

  return (
    <article className="my-8 flex w-full flex-col gap-4">
      <Heading title={post.title} bold />
      <hr />
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={post.image}
          alt="post image"
          fill
          className="rounded-md object-cover"
        />
      </div>
      {/* Author Info */}
      <hr />
      <section className="flex max-w-[500px] gap-2 font-josefin">
        <div className="relative h-12 w-12 lg:h-20 lg:w-20">
          <Image
            src={post.author.image || "/images/placeholder.jpg"}
            alt="author profile picture"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-">
          <p className="text-lg font-semibold sm:text-xl md:text-2xl">
            {post.author.name}
          </p>
          <p className="text-sm  sm:text-base md:text-lg">
            {post.updatedAt === post.createdAt
              ? `Published: ${dateFormat(post.updatedAt)}`
              : `Updated: ${dateFormat(post.updatedAt)}`}
          </p>
        </div>
      </section>
      <hr />
      <p className="whitespace-pre-line md:text-lg">{post.content}</p>
      <hr />
      <div className="space-y-1">
        <p className="font-josefin md:text-lg lg:text-xl">Tags</p>
        <p>
          {post.tags.map((tag) => (
            <span
              onClick={() => router.push(`/explore/tags/${tag}`)}
              key={tag}
              className="cursor-pointer font-josefin text-neutral-600 transition-colors duration-300 hover:text-black md:text-lg lg:text-2xl"
            >
              | {tag}{" "}
            </span>
          ))}
        </p>
      </div>
      <hr />
    </article>
  );
};

export default Post;
