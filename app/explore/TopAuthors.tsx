"use client";

import { FC } from "react";
import { UserWithPosts } from "../types";
import AuthorCard from "../components/AuthorCard";
import { motion } from "framer-motion";

interface TopUserProps {
  authors: UserWithPosts[] | null;
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
      className="rounded-lg bg-gradient-to-b md:bg-gradient-to-r from-accent via-black to-primary px-4 py-8 shadow-[0_0_20px_gray] sm:px-8 md:px-12 lg:px-20"
    >
      {/* <Heading white center small title="Top Authors" /> */}
      <p className="mb-4 text-center font-josefin text-3xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
        TOP AUTHORS
      </p>
      <div
        className={`mx-auto grid w-full grid-cols-2 gap-4 gap-y-8 md:grid-cols-4 md:gap-6 lg:gap-8 ${
          authors.length > 4 ? "xl:grid-cols-6" : ""
        }`}
      >
        {authors.map((author, index) => (
          <AuthorCard key={author.id} author={author} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default TopAuthors;
