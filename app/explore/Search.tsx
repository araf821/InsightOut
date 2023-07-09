"use client";

import { FC, useState } from "react";
import { SafePost } from "../types";
import PostCard from "../components/PostCard";
import Button from "../components/Button";

interface SearchBarProps {
  posts: SafePost[] | null;
}

const Search: FC<SearchBarProps> = ({ posts }) => {
  const [results, setResults] = useState<SafePost[]>(posts || []);
  const [hide, setHide] = useState<boolean>(false);

  return (
    <section>
      {/* Search bar */}
      <div className="">
        <input type="text" className="h-8 w-full border-black bg-pink-500" />
      </div>

      {/* Search results */}
      <div
        className={`origin-top transition duration-1000 grid w-full grid-cols-3 gap-6 ${
          !hide ? "scale-y-100" : "scale-y-0"
        }`}
      >
        {results.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <Button
        label="Click me"
        onClick={() => {
          if (results.length) {
            setHide(true);
            setTimeout(() => {
              setResults([]);
            }, 1000);
          } else {
            setResults(posts || []);
            setHide(false);
          }
        }}
      />
    </section>
  );
};

export default Search;
