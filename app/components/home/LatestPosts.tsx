"use client";

import { FC } from "react";
import Container from "../Container";
import Button from "../Button";
import { SafePost } from "@/app/types";
import PostCard from "../PostCard";

interface LatestPostsProps {
  posts: SafePost[] | null;
}

const LatestPosts: FC<LatestPostsProps> = ({ posts }) => {
  if (!posts) return null;

  return (
    <Container>
      <div className="pb-12 pt-4">
        <p className="text-4xl sm:text-5xl lg:text-6xl">
          <span className="font-josefin font-semibold">Latest Posts</span>
        </p>
        <hr className="w-12 border-4 border-accent md:w-20" />

        {/* Cards container */}
        <div className="mt-4 flex flex-col gap-6 bg-bg md:flex-row md:justify-between md:rounded-md md:bg-secondary md:p-2 md:shadow-lg lg:gap-8 lg:p-3 xl:p-4">
          <div className="h-full w-full">
            <PostCard main post={posts[0]} />
          </div>
          <div className="flex h-fit w-full max-w-[753px] flex-col gap-4">
            <PostCard horizontal post={posts[1]} />
            <PostCard horizontal post={posts[2]} />
          </div>
        </div>

        {/* View More button */}
        <div className="mx-auto max-w-[20rem] pt-6">
          <Button onClick={() => {}} label="View More" />
        </div>
      </div>
    </Container>
  );
};

export default LatestPosts;
