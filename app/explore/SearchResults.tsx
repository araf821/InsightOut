import { motion } from "framer-motion";
import { FC } from "react";
import { SafePost } from "../types";
import { useRouter } from "next/navigation";
import { GrClear } from "react-icons/gr";
import dynamic from "next/dynamic";

interface SearchResultsProps {
  posts: SafePost[];
  displayed: number;
}

const DynamicPostCard = dynamic(() => import("@/components/PostCard"), {
  loading: () => (
    <div className="h-full w-full animate-pulse bg-neutral-400"></div>
  ),
  ssr: false,
});

const SearchResults: FC<SearchResultsProps> = ({ posts, displayed }) => {
  const router = useRouter();

  return (
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
          aria-label="clear search button"
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
          <DynamicPostCard post={post} key={`${post.id}search`} />
        ))}
      </div>
    </motion.section>
  );
};

export default SearchResults;
