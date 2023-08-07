import Intro from "@/components/home/Intro";
import getLatestPosts from "./actions/getLatestPosts";
import getPostByTitle from "./actions/getPostByTitle";
import Hero from "@/components/home/Hero";
import NewsletterSection from "@/components/home/NewsletterSection";
import LatestPosts from "@/components/home/LatestPosts";
import getStats from "./actions/getStats";

export default async function Home() {
  const [stats, latestPosts, featuredPost] = await Promise.all([
    getStats(),
    getLatestPosts(3),
    getPostByTitle(
      "Epic Journey and Timeless Legacy: Why One Piece Is the Greatest Anime Ever Created"
    ),
  ]);

  return (
    <div className="relative">
      <div className="absolute top-0 -z-10 hidden scale-x-[-1] overflow-hidden md:block">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "200%", height: 800 }}
          className="fill-secondary"
        >
          <path d="M1200 120L0 16.48V0h1200v120z" />
        </svg>
      </div>
      <Intro stats={stats} />
      <Hero post={featuredPost} />
      <NewsletterSection />
      <LatestPosts posts={latestPosts} />
    </div>
  );
}
