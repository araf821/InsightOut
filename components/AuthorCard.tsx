"use client";

import { FC, useCallback } from "react";
import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { UserWithPosts } from "@/app/types";

interface AuthorCardProps {
  author: UserWithPosts;
  index?: number;
}

const AuthorCard: FC<AuthorCardProps> = ({ author, index = 0 }) => {
  const postsPublished = author.posts.filter((post) => {
    if (post.published) return post;
  });

  const handleFollow = useCallback(() => {
    toast.error("Feature coming soon!");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      viewport={{ once: true }}
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
        <FaUserPlus
          onClick={handleFollow}
          title="Follow User"
          className="absolute right-2 top-2 z-10 cursor-pointer rounded-md bg-black/10 p-1 text-2xl text-white transition duration-200 hover:scale-125 hover:animate-pulse"
        />
        <Image
          src={author.image || "/images/placeholder.jpg"}
          alt="author's profile photo"
          fill
          className="absolute w-full rounded-xl object-cover"
        />
      </div>
      <div className="mx-auto mt-2 space-y-0.5 text-center font-josefin">
        <p className="text-xl font-semibold text-bg">{author.name}</p>
        <p className="md:text-lg text-bg/80">
          Posts Published: {postsPublished.length}
        </p>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
