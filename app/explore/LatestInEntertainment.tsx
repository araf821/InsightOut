import { FC } from "react";
import { SafePost } from "../types";
import Heading from "../components/Heading";
import PostCard from "../components/PostCard";
import CardsContainer from "../components/CardsContainer";

interface LatestInEntertainmentProps {
  posts: SafePost[] | null;
}

const LatestInEntertainment: FC<LatestInEntertainmentProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In*Entertainment" />
      <CardsContainer>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInEntertainment;
