import { FC } from "react";
import Container from "../Container";

interface LatestPostsProps {}

const LatestPosts: FC<LatestPostsProps> = ({}) => {
  return (
    <Container>
      <div className="my-8">
        <p className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
          <span>Latest Posts</span>
        </p>
      </div>
    </Container>
  );
};

export default LatestPosts;
