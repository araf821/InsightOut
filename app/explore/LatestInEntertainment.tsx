import { FC } from "react";
import { SafePost } from "../types";
import Heading from "@/components/Heading";
import CardsContainer from "@/components/CardsContainer";
import PostCard from "@/components/PostCard";

interface LatestInEntertainmentProps {
  posts: SafePost[] | null;
}

const LatestInEntertainment: FC<LatestInEntertainmentProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In*Entertainment" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard post={post} key={post.id} index={index} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInEntertainment;
