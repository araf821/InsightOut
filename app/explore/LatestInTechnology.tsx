import { FC } from "react";
import { SafePost } from "../types";
import Heading from "../components/Heading";
import PostCard from "../components/PostCard";
import CardsContainer from "../components/CardsContainer";

interface LatestInTechnologyProps {
  posts: SafePost[] | null;
}

const LatestInTechnology: FC<LatestInTechnologyProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In*Technology" />
      <CardsContainer>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInTechnology;
