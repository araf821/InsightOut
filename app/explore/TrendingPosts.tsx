'use client'

import { FC } from "react";
import { SafePost } from "../types";
import { motion } from "framer-motion";
import CardsContainer from "@/components/CardsContainer";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";

interface TrendingPostsProps {
  posts: SafePost[] | null;
}

const TrendingPosts: FC<TrendingPostsProps> = ({ posts }) => {
  if (!posts) {
    return null;
  }
  return (
    <section>
      <Heading small title="Trending Posts" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard post={post} key={post.id} index={index} />
        ))}
      </CardsContainer>
      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default TrendingPosts;
