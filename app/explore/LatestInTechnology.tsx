import { FC } from "react";
import { SafePost } from "../types";
import Heading from "@/components/Heading";
import CardsContainer from "@/components/CardsContainer";
import PostCard from "@/components/PostCard";

interface LatestInTechnologyProps {
  posts: SafePost[] | null;
}

const LatestInTechnology: FC<LatestInTechnologyProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In*Technology" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard index={index} post={post} key={`${post.id}tech`} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInTechnology;
