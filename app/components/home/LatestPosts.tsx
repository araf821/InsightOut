import { FC } from "react";
import Container from "../Container";
import { Merriweather } from "next/font/google";
import PostCard from "../PostCard";

const merri = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

interface LatestPostsProps {}

const LatestPosts: FC<LatestPostsProps> = ({}) => {
  return (
    <Container>
      <div className="my-4">
        <p className="text-4xl sm:text-5xl lg:text-6xl">
          <span className={merri.className}>Latest Posts</span>
        </p>
        <hr />

        {/* Cards container */}
        <div className="grid grid-cols-1 place-items-center gap-8 gap-y-4 py-4 md:grid-cols-2 lg:grid-cols-3">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </Container>
  );
};

export default LatestPosts;
