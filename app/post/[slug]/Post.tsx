"use client";

import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost, SafeUser } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import PostContent from "./PostContent";
import { FaEdit } from "react-icons/fa";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import { singlePostVariants } from "@/app/lib/anim";
import PostViews from "./PostViews";

interface PostProps {
  post: SafePost;
  currentUser: SafeUser | null;
}

const Post: FC<PostProps> = ({ post, currentUser }) => {
  const router = useRouter();

  let editButton = null;
  if (currentUser?.id === post.authorId) {
    editButton = (
      <>
        <hr />
        <button
          aria-label="edit post button"
          onClick={() => router.push(`/post/update/${post.slug}`)}
          className="flex w-fit items-center gap-1 font-semibold text-neutral-600 transition duration-200 hover:translate-x-2 hover:text-neutral-900 md:text-lg lg:text-xl"
        >
          <FaEdit />
          Edit Post
        </button>
      </>
    );
  }

  return (
    <motion.article
      variants={singlePostVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-4 mt-8 flex w-full max-w-[950px] mx-auto flex-col gap-4"
    >
      <Heading post title={post.title} />
      <hr />
      <div className="flex items-center justify-between">
        <p>
          {post.tags.map((tag) => (
            <span
              onClick={() => router.push(`/explore/?keyword=&tag=${tag}`)}
              key={tag}
              className="cursor-pointer font-josefin text-neutral-600 transition-colors duration-300 hover:text-black md:text-lg lg:text-2xl"
            >
              | {tag}{" "}
            </span>
          ))}
        </p>
        <PostViews views={post.views} postId={post.id} />
      </div>
      <hr />
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={post.image}
          alt="post image"
          sizes="(max-width: 768px) 100vw, 80vw"
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      {/* {currentUser?.id === post.authorId ? <p>Edit This Post</p> : <p>asdf</p>} */}
      <PostContent content={post.content} />

      {editButton}
      <hr />
    </motion.article>
  );
};

export default Post;
