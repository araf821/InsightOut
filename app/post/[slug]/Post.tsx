"use client";

import { dateFormat } from "@/lib/helpers/dateFormat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import PostContent from "./PostContent";
import { FaEdit } from "react-icons/fa";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import { singlePostVariants } from "@/lib/anim";
import PostViews from "./PostViews";
import { Comment, Post, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2, UserPlus } from "lucide-react";
import qs from "query-string";
import axios from "axios";
import { toast } from "react-hot-toast";
import FollowButton from "@/components/FollowButton";

interface PostProps {
  post: Post & { author: User; comments: Comment[] };
  currentUser: User | null;
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
          onClick={() =>
            router.push(`/post/update/${post.slug}`, { scroll: true })
          }
          className="flex w-fit items-center gap-1 font-semibold text-neutral-600 transition duration-200 hover:translate-x-2 hover:text-neutral-900 md:text-lg lg:text-xl"
        >
          <FaEdit />
          Edit Post
        </button>
      </>
    );
  }

  const {
    mutate: onFollow,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const url = qs.stringifyUrl({
        url: "/api/following",
        query: {
          toFollowId: post.authorId,
        },
      });

      await axios.post(url);
    },
    onError: (e: Error) => {
      if (e.message.includes("401")) {
        return toast.error("Unauthorized");
      }

      if (e.message.includes("400")) {
        return toast.error("Bad Request");
      }

      if (e.message.includes("418")) {
        return toast.error("Already Following");
      }

      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      toast.success("Followed");
    },
  });

  return (
    <motion.article
      variants={singlePostVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mx-auto mb-4 mt-8 flex w-full max-w-[950px] flex-col gap-4"
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
      <section className="flex gap-2 font-josefin">
        <div className="relative h-12 w-12 lg:h-20 lg:w-20">
          <Image
            src={post.author.image || "/images/placeholder.jpg"}
            alt="author profile picture"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full">
          <p className="flex justify-between text-lg font-semibold sm:text-xl md:text-2xl">
            <span
              onClick={() => {
                router.push(`/user/${post.authorId}`);
              }}
              className="cursor-pointer"
            >
              {post.author.name}
            </span>
            {isError ? null : currentUser?.id ===
              post.authorId ? null : isSuccess ? (
              <Check />
            ) : isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              // <button
              //   onClick={() => onFollow()}
              //   className="text-zinc-500 transition hover:text-zinc-600"
              // >
              //   <UserPlus />
              // </button>
              <FollowButton toFollowId={post.authorId} />
            )}
          </p>
          <p className="text-sm  sm:text-base md:text-lg">
            Published: {dateFormat(post.createdAt.toISOString())}
          </p>
        </div>
      </section>
      <hr />
      <PostContent content={post.content} />
      {editButton}
      <hr />
    </motion.article>
  );
};

export default Post;
