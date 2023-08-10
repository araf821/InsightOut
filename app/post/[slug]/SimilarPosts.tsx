"use client";

import { SafePost } from "@/types";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import { FC } from "react";

interface SimilarPostsProps {
  posts: SafePost[] | null;
}

const SimilarPosts: FC<SimilarPostsProps> = ({ posts }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <section className="">
      <Heading title="Similar Posts" small />
      <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};

export default SimilarPosts;
