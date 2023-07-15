import { FC } from "react";
import { SafePost } from "../types";
import Heading from "../components/Heading";
import PostCard from "../components/PostCard";

interface LatestInNewsProps {
  posts: SafePost[] | null;
}

const LatestInNews: FC <LatestInNewsProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Latest In News" />
      <div className="my-4 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};

export default LatestInNews;
