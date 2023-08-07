"use client";

import { SafePost } from "@/app/types";
import CardsContainer from "@/components/CardsContainer";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import { FC, useEffect, useState } from "react";
import SingleSelect from "../../../components/SingleSelect";
import { useRouter } from "next/navigation";

const options = [
  "Latest Posts",
  "Oldest Posts",
  "Most Popular",
  "Least Popular",
  "Sort by Name [A-Z]",
  "Sort by Name [Z-A]",
];

interface AllPostsClientProps {
  posts: SafePost[] | null;
}

const AllPostsClient: FC<AllPostsClientProps> = ({ posts }) => {
  const router = useRouter();

  const [displayed, setDisplayed] = useState(6);
  const [allPosts, setAllPosts] = useState<SafePost[] | null | undefined>(
    posts
  );

  const [selectedOption, setSelected] = useState<string>(options[0]);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    const lastPostElement = document.querySelector(".post-card:last-child");
    if (!lastPostElement) {
      return;
    }
    const lastPostDistance = lastPostElement.getBoundingClientRect().bottom;

    const threshold = 200;
    if (lastPostDistance <= window.innerHeight + threshold) {
      // Load more posts when the last post is within the threshold from the bottom of the viewport
      setDisplayed((prevNumber) => prevNumber + 6);
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

  // SORTING FUNCTIONALITY
  useEffect(() => {
    if (!allPosts) {
      return;
    }

    let newPosts: SafePost[] = [...allPosts];

    if (selectedOption === "Latest Posts") {
      newPosts = allPosts?.sort(
        (current, next) =>
        new Date(next.createdAt).getTime() -
        new Date(current.createdAt).getTime()
      );
    } else if (selectedOption === "Oldest Posts") {
      newPosts = allPosts?.sort(
        (current, next) =>
        new Date(current.createdAt).getTime() -
        new Date(next.createdAt).getTime()
      );
    } else if (selectedOption === "Most Popular") {
      newPosts = allPosts.sort((a, b) => b.views - a.views);
    } else if (selectedOption === "Least Popular") {
      newPosts = allPosts.sort((a, b) => a.views - b.views);
    } else if (selectedOption === "Sort by Name [A-Z]") {
      newPosts = allPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOption === "Sort by Name [Z-A]") {
      newPosts = allPosts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setAllPosts(newPosts);
    router.refresh();
  }, [allPosts, router, selectedOption]);

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
      <SingleSelect
        onChange={(option) => setSelected(option)}
        options={options}
        selected={selectedOption}
      />

      <CardsContainer>
        {allPosts.slice(0, displayed).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default AllPostsClient;
