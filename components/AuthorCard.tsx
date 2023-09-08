"use client";

import { FC } from "react";
import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import qs from "query-string";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Post, User } from "@prisma/client";

interface AuthorCardProps {
  author: User & { posts: Post[] };
  index?: number;
}

const AuthorCard: FC<AuthorCardProps> = ({ author, index = 0 }) => {
  const postsPublished = author.posts.filter((post) => {
    if (post.published) return post;
  });

  const { mutate: handleFollow, isLoading } = useMutation({
    mutationFn: async () => {
      const url = qs.stringifyUrl({
        url: "/api/following",
        query: {
          toFollowId: author.id,
        },
      });

      await axios.post(url);
    },
    onError: (error: Error) => {
      if (error.message === "Request failed with status code 400") {
        return toast.error("Can't follow yourself!");
      }

      if (error.message === "Request failed with status code 401") {
        return toast.error("Unauthorized.");
      }

      return toast.error("Something went wrong.");
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      whileTap={{
        scale: 1,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          type: "spring",
          delay: index * 0.3,
          damping: 12,
          stiffness: 200,
        },
      }}
      className="aspect-[5/6] w-full"
    >
      <div className="relative aspect-square overflow-hidden">
        {isLoading ? (
          <Loader2 className="absolute right-2 top-2 z-10 animate-spin bg-black/10 p-1 text-2xl text-white" />
        ) : (
          <FaUserPlus
            onClick={() => handleFollow()}
            title="Follow User"
            className="absolute right-2 top-2 z-10 cursor-pointer rounded-md bg-black/10 p-1 text-2xl text-white transition duration-200 hover:scale-125 hover:animate-pulse"
          />
        )}
        <Image
          src={author.image || "/images/placeholder.jpg"}
          alt="author's profile photo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute w-full rounded-xl object-cover"
        />
      </div>
      <div className="mx-auto mt-2 space-y-0.5 text-center font-josefin">
        <p className="text-xl font-semibold text-bg">{author.name}</p>
        <p className="text-bg/80 md:text-lg">
          Posts Published: {postsPublished.length}
        </p>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
