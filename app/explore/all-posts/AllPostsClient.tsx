"use client";

import { SafePost } from "@/app/types";
import Button from "@/components/Button";
import CardsContainer from "@/components/CardsContainer";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import { FC, useCallback, useEffect, useState } from "react";

interface AllPostsClientProps {
  posts: SafePost[] | null;
}

const AllPostsClient: FC<AllPostsClientProps> = ({ posts }) => {
  const [displayed, setDisplayed] = useState(6);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    const lastPostElement = document.querySelector(".post-card:last-child");
    if (!lastPostElement) {
      console.log("doesn't exist");
      return;
    }
    const lastPostDistance = lastPostElement.getBoundingClientRect().bottom;
    
    const threshold = 200;
    if (lastPostDistance <= window.innerHeight + threshold) {
      // Load more posts when the last post is within the threshold from the bottom of the viewport
      setDisplayed((prevNumber) => prevNumber + 6);
      console.log("increment");
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!posts?.length) {
    return (
      <EmptyState
        title="404 No Posts Found"
        subtitle="Somebody must've deleted our whole database!"
      />
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <Heading title="All Posts" />

      {/* Sort Component */}
      <div>
        <p>Sort by: </p>
      </div>

      <CardsContainer>
        {posts.slice(0, displayed).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default AllPostsClient;
