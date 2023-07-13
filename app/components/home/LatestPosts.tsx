"use client";

import { FC } from "react";
import Container from "../Container";
import Button from "../Button";
import { SafePost } from "@/app/types";
import PostCard from "../PostCard";
import Heading from "../Heading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface LatestPostsProps {
  posts: SafePost[] | null;
}

const LatestPosts: FC<LatestPostsProps> = ({ posts }) => {
  const router = useRouter();
  if (!posts?.length) return null;

  return (
    <Container>
      <motion.div
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.75,
          },
        }}
        initial={{
          y: 100,
          opacity: 0,
        }}
        className="-mt-12 pb-12"
      >
        <Heading title="Latest Posts" />

        {/* Cards container */}
        <div className="mt-4 flex flex-col gap-6 from-secondary via-black to-secondary md:flex-row md:justify-between md:rounded-md md:bg-secondary md:p-2 md:shadow-lg lg:gap-8 lg:p-3 xl:p-4">
          <div className="h-full w-full">
            <PostCard index={1} main post={posts[0]} />
          </div>
          <div className="flex h-fit w-full max-w-[753px] flex-col gap-4">
            <PostCard index={1} horizontal post={posts[1]} />
            <PostCard index={1} horizontal post={posts[2]} />
          </div>
        </div>

        {/* View More button */}
        <div className="mx-auto max-w-[20rem] pt-6">
          <Button
            onClick={() => router.push("/explore")}
            outline
            label="View More"
          />
        </div>
      </motion.div>
    </Container>
  );
};

export default LatestPosts;
