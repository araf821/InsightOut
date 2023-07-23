import { FC } from "react";
import Heading from "../components/Heading";
import { SafePost } from "../types";
import PostCard from "../components/PostCard";
import CardsContainer from "../components/CardsContainer";

interface TrendingPostsProps {
  posts: SafePost[] | null;
}

const TrendingPosts: FC<TrendingPostsProps> = ({ posts }) => {
  if (!posts) {
    return null;
  }

  return (
    <section>
      <Heading small title="Trending Posts" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard post={post} key={post.id} index={index} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default TrendingPosts;
