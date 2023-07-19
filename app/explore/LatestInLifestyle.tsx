import { FC } from "react";
import { SafePost } from "../types";
import Heading from "../components/Heading";
import PostCard from "../components/PostCard";
import CardsContainer from "../components/CardsContainer";

interface LatestInLifestyleProps {
  posts: SafePost[] | null;
}

const LatestInLifestyle: FC<LatestInLifestyleProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In Lifestyle" />
      <CardsContainer>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInLifestyle;
