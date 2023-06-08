import { FC } from "react";
import Container from "../Container";
import { Merriweather } from "next/font/google";
import PostCard from "../PostCard";
import DynamicPostContainer from "./DynamicPostContainer";

const merri = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

interface LatestPostsProps {}

const LatestPosts: FC<LatestPostsProps> = ({}) => {
  /**
   * @todo: get the three latest posts
   */
  return (
    <Container>
      <div className="pb-12 pt-4">
        <p className="text-4xl sm:text-5xl lg:text-6xl">
          <span className={merri.className}>Latest Posts</span>
        </p>
        <hr />

        {/* Cards container */}
        <DynamicPostContainer />
      </div>
    </Container>
  );
};

export default LatestPosts;
