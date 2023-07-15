import { FC } from "react";
import Heading from "../components/Heading";
import { SafePost } from "../types";
import PostCard from "../components/PostCard";

interface TrendingPostsProps {
  posts: SafePost[] | null;
}

const TrendingPosts: FC<TrendingPostsProps> = ({ posts }) => {
  if (!posts) {
    return null;
  }

  return (
    <section
    >
      <Heading small title="Trending Posts" />
      <div className="my-4 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};

export default TrendingPosts;
