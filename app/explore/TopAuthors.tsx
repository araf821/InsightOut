"use client";

import { FC } from "react";
import { UserWithPosts } from "../types";
import Heading from "../components/Heading";
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
    <motion.section>
      <Heading title="Top Authors" />
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8 xl:grid-cols-6">
        {authors.map((author, index) => (
          <AuthorCard key={author.id} author={author} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default TopAuthors;
