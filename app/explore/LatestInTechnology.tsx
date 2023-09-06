import { FC } from "react";
import Heading from "@/components/Heading";
import CardsContainer from "@/components/CardsContainer";
import PostCard from "@/components/post/PostCard";
import { Post, User } from "@prisma/client";

interface LatestInTechnologyProps {
  posts: (Post & { author: User })[] | null;
}

const LatestInTechnology: FC<LatestInTechnologyProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Technology" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard index={index} post={post} key={`${post.id}tech`} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInTechnology;
