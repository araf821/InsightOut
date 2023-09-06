"use client";

import { SafePost } from "@/types";
import Heading from "@/components/Heading";
import PostCard from "@/components/post/PostCard";
import { FC } from "react";
import { Post, User } from "@prisma/client";
import CardsContainer from "@/components/CardsContainer";

interface SimilarPostsProps {
  posts: (Post & { author: User })[];
}

const SimilarPosts: FC<SimilarPostsProps> = ({ posts }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <section className="">
      <Heading title="Similar Posts" small />
      <CardsContainer>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default SimilarPosts;
