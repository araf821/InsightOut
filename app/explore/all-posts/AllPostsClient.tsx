"use client";

import { SafePost } from "@/app/types";
import CardsContainer from "@/components/CardsContainer";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import { FC, useEffect, useState } from "react";
import SingleSelect from "../../../components/SingleSelect";

const options = ["Latest Posts", "Oldest Posts", "Most Comments"];

interface AllPostsClientProps {
  posts: SafePost[] | null;
}

const AllPostsClient: FC<AllPostsClientProps> = ({ posts }) => {
  const [displayed, setDisplayed] = useState(6);
  const [allPosts, setAllPosts] = useState<SafePost[] | null | undefined>(
    () => {
      return posts?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  );
  const [selectedOption, setSelected] = useState<string>(options[0]);

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

  useEffect(() => {
    if (!posts) {
      return;
    }

    let newPosts: SafePost[] = [];

    if (selectedOption === "Latest Posts") {
      newPosts = posts?.sort(
        (current, next) =>
          new Date(current.createdAt).getTime() -
          new Date(next.createdAt).getTime()
      );
    } else if (selectedOption === "Oldest Posts") {
      newPosts = posts?.sort(
        (current, next) =>
          new Date(next.createdAt).getTime() -
          new Date(current.createdAt).getTime()
      );
    }

    setAllPosts(newPosts);
  }, [selectedOption]);

  if (!allPosts || !allPosts?.length) {
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
      <div className="flex gap-1.5">
        {/* <p>Sort by: </p> */}
        <SingleSelect
          onChange={(option) => setSelected(option)}
          options={options}
          selected={selectedOption}
        />
      </div>

      <CardsContainer>
        {allPosts.slice(0, displayed).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default AllPostsClient;
