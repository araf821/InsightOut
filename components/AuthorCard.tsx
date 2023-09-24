"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface AuthorCardProps {
  author: User & { posts: Post[] };
  index?: number;
}

const AuthorCard: FC<AuthorCardProps> = ({ author, index = 0 }) => {
  const postsPublished = author.posts.filter((post) => {
    if (post.published) return post;
  });
  const router = useRouter();

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
      onClick={() => {
        router.push(`/user/${author.id}`);
      }}
      className="aspect-[5/6] w-full cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={author.image || "/images/placeholder.jpg"}
          alt="author's profile photo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute w-full rounded-xl object-cover"
        />
      </div>
      <div className="mx-auto mt-2 space-y-0.5 text-center font-josefin">
        <p onClick={() => {}} className="text-xl font-semibold text-bg">
          {author.name}
        </p>
        <p className="text-bg/80 md:text-lg">
          Posts Published: {postsPublished.length}
        </p>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
