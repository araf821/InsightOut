import { FC } from "react";
import { SafePost } from "../types";
import Heading from "@/components/Heading";
import CardsContainer from "@/components/CardsContainer";
import PostCard from "@/components/PostCard";

interface LatestInLifestyleProps {
  posts: SafePost[] | null;
}

const LatestInLifestyle: FC<LatestInLifestyleProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In Lifestyle" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard post={post} key={post.id} index={index} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInLifestyle;
