"use client";

import { FC, useCallback, useState } from "react";
import { SafePost } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillFilter } from "react-icons/ai";
import { options } from "../post/write/PostForm";
import { FaSearch } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import PostCard from "@/components/PostCard";

interface SearchBarProps {
  posts: SafePost[] | null;
}

const Search: FC<SearchBarProps> = ({ posts }) => {
  const params = useSearchParams();

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>(params?.get("keyword") || "");
  const [selectedTag, setSelectedTag] = useState<string>(
    params?.get("tag") || ""
  );

  // Pagination stuff
  const [displayed, setDisplayed] = useState<number>(6);

  const router = useRouter();

  const handleSearch = useCallback(async () => {
    let currentQuery: any = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    if (
      (params?.get("tag") === selectedTag &&
        params?.get("keyword") === keyword) ||
      (!keyword.trim().length && selectedTag === "")
    ) {
      return;
    }

    const updatedQuery: any = {
      ...currentQuery,
      keyword,
      tag: selectedTag,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/explore",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [params, keyword, selectedTag, router]);
  console.log("Posts: ", posts);

  const handleLoadMore = () => {
    setDisplayed((prev) => prev + 9);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ height: "auto" }}
      viewport={{ once: true }}
    >
      {/* Search bar */}
      <div className="relative grid w-full gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <motion.form
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 200,
            },
          }}
          initial={{
            opacity: 0,
            x: -100,
          }}
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
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className={`peer w-full rounded-md border-2 px-4 py-3 outline-none focus:border-zinc-800`}
          />
          <label
            className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
          >
            Search
          </label>
        </motion.form>
        <motion.div
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              delay: 0.2,
            },
          }}
          initial={{
            opacity: 0,
            x: 100,
          }}
          className="flex items-center gap-1.5"
        >
          <div
            className={`grid h-full cursor-pointer place-items-center rounded-sm p-2  transition duration-300 hover:text-accent hover:shadow-accent active:shadow-inner ${
              isFiltersOpen
                ? "text-accent shadow-inner shadow-accent"
                : "text-zinc-700 shadow-zinc-600"
            }`}
            onClick={() => setIsFiltersOpen((isOpen) => !isOpen)}
          >
            <AiFillFilter className="text-3xl" />
          </div>
          <button
            disabled={selectedTag || keyword ? false : true}
            onClick={handleSearch}
            className="f-full my-0.5 w-full self-stretch border-2 border-zinc-800 p-2 outline-none transition duration-300 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-1"
          >
            <FaSearch className="mx-auto text-xl" />
          </button>
        </motion.div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            className="mt-2 w-full font-josefin"
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3 },
            }}
          >
            <p className="text-xl font-semibold text-zinc-700">Filters</p>
            <hr />
            <p className="py-2">TAGS</p>
            <div className="max-w-96 grid grid-cols-2 items-center gap-x-2 gap-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {options.map((tag) => (
                <span
                  onClick={() => {
                    selectedTag === tag.label
                      ? setSelectedTag("")
                      : setSelectedTag(tag.label);
                  }}
                  className={`${
                    tag.label === selectedTag
                      ? "scale-105 bg-primary text-white opacity-100"
                      : "hover:translate-x-1 hover:bg-blue-200"
                  } cursor-pointer py-0 text-lg font-light transition duration-300 lg:text-xl`}
                  key={tag.label}
                >
                  | {tag.label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search results */}
      {posts?.length ? (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
          className="space-y-2 py-4"
        >
          <hr />
          <p className="flex justify-between">
            <span className="font-josefin font-light sm:text-lg md:text-xl">
              {posts.length} {posts.length > 1 ? "Results" : "Result"} Found
            </span>
            <button
              onClick={() => {
                router.push("/explore");
              }}
              className="flex w-fit items-center gap-1 text-sm font-light text-zinc-600 transition hover:scale-110 hover:text-black md:text-base"
            >
              <GrClear />
              Clear Search
            </button>
          </p>

          <div
            className={`grid w-full origin-top grid-cols-1 gap-6 transition duration-1000 md:grid-cols-2 lg:grid-cols-3`}
          >
            {posts.slice(0, displayed)?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </motion.section>
      ) : (
        posts?.length === 0 && (
          <div className="my-4 grid h-32 w-full place-content-center rounded-lg text-center text-lg lg:text-2xl">
            No results match the search criteria.
            <button
              onClick={() => {
                router.push("/explore");
              }}
              className="mx-auto flex w-fit items-center gap-1 text-base font-light text-zinc-600 transition hover:-translate-y-1 hover:text-black"
            >
              <GrClear />
              Clear Search Criteria
            </button>
          </div>
        )
      )}
      <hr className="mt-4" />
    </motion.section>
  );
};

export default Search;
