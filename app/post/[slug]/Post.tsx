import Heading from "@/app/components/Heading";
import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost } from "@/app/types";
import Image from "next/image";
import { FC } from "react";

interface PostProps {
  post: SafePost;
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <article className="my-8 flex max-w-[1024px] flex-col gap-4">
      <Heading title={post.title} bold />
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
            src={post.author.image}
            alt="author profile picture"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-">
          <p className="text-lg font-semibold sm:text-xl md:text-2xl">
            {post.author.name}
          </p>
          <p className="text-sm font-light sm:text-base md:text-lg">
            {post.updatedAt === post.createdAt
              ? `Published: ${dateFormat(post.updatedAt)}`
              : `Updated: ${dateFormat(post.updatedAt)}`}
          </p>
        </div>
      </section>
      <hr />
      <p>{post.content}</p>
      <p>{post.tags}</p>
    </article>
  );
};

export default Post;
