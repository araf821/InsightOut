"use client";

import { FC } from "react";
import { SafePost } from "../../types";
import Heading from "@/components/Heading";
import CardsContainer from "@/components/CardsContainer";
import PostCard from "@/components/post/PostCard";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { Post, User } from "@prisma/client";

interface LatestInLifestyleProps {
  posts: (Post & { author: User })[] | null;
}

const LatestInLifestyle: FC<LatestInLifestyleProps> = ({ posts }) => {
  const router = useRouter();
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In Lifestyle" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard post={post} key={`${post.id}life`} index={index} />
        ))}
      </CardsContainer>
      <hr className="pb-6" />
      <Button
        onClick={() => router.push("/explore/all-posts")}
        label="View All Posts"
        small
        className="mx-auto max-w-[400px]"
      />
    </section>
  );
};

export default LatestInLifestyle;
