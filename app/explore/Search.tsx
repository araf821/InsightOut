"use client";

import { FC, useCallback, useState } from "react";
import { SafePost } from "../types";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { AnimatePresence, motion } from "framer-motion";

interface SearchBarProps {
  posts: SafePost[] | null;
}

const Search: FC<SearchBarProps> = ({ posts }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const params = useSearchParams();

  const handleSearch = useCallback(async () => {
    let currentQuery: any = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      keyword,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/explore",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [params, keyword, router]);

  return (
    <motion.section animate={{ height: "auto" }}>
      {/* Search bar */}
      <div className="relative mb-4 grid w-full gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="sm:col-span-2 md:col-span-3 lg:col-span-4"
        >
          <input
            id="name"
            type="text"
            placeholder=" "
            autoFocus
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className={`peer w-full rounded-md border-2 px-4 py-3`}
          />
          <label
            className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
          >
            Search
          </label>
        </form>
        <Button
          label="Search"
          className="sm:col-span-1"
          special
          onClick={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="border-2 w-fit border-zinc-400 text-zinc-600 hover:text-zinc-800 px-2 transition duration-300 hover:border-zinc-800">
        Filters
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            className="w-full border-2 px-2"
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3 },
            }}
          >
            <p className="text-lg font-semibold">Tags</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search results */}
      <div
        className={`mt-8 grid w-full origin-top grid-cols-3 gap-6 transition duration-1000 `}
      >
        {posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </motion.section>
  );
};

export default Search;
