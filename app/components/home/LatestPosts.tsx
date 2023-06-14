"use client";

import { FC } from "react";
import Container from "../Container";
import DynamicPostContainer from "./DynamicPostContainer";
import Button from "../Button";

interface LatestPostsProps {}

const LatestPosts: FC<LatestPostsProps> = ({}) => {
  /**
   * @todo: get the three latest posts
   */
  return (
    <Container>
      <div className="pb-12 pt-4">
        <p className="text-4xl sm:text-5xl lg:text-6xl">
          <span className="font-merri ">Latest Posts</span>
        </p>
        <hr className="w-12 border-4 border-accent md:w-20" />

        {/* Cards container */}
        <DynamicPostContainer />
        <div className="mx-auto max-w-[20rem] pt-6">
          <Button onClick={() => {}} label="View More" />
        </div>
      </div>
    </Container>
  );
};

export default LatestPosts;
