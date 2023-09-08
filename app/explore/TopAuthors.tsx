"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import AuthorCard from "@/components/AuthorCard";
import { Post, User } from "@prisma/client";

interface TopUserProps {
  authors: (User & { posts: Post[] })[] | null;
}

const TopAuthors: FC<TopUserProps> = ({ authors }) => {
  if (!authors || !authors?.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 1, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      className="rounded-xl bg-gradient-to-b from-accent via-black to-primary px-4 py-10 shadow-[0_0_20px_gray] sm:px-8 md:bg-gradient-to-r md:px-12 md:py-16 lg:px-20"
    >
      <p className="mb-8 text-center font-josefin text-3xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
        TOP AUTHORS
      </p>
      <div
        className={`mx-auto grid w-full grid-cols-2 gap-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:gap-8
          xl:grid-cols-6`}
      >
        {authors.map((author, index) => (
          <AuthorCard key={author.id} author={author} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default TopAuthors;
