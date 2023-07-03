import Heading from "@/app/components/Heading";
import PostCard from "@/app/components/PostCard";
import { SafePost } from "@/app/types";
import { FC } from "react";

interface SimilarPostsProps {
  posts: SafePost[];
}

const SimilarPosts: FC<SimilarPostsProps> = ({ posts }) => {
  return (
    <section className="my-8">
      <Heading title="Similar Posts" small />
      <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};

export default SimilarPosts;
