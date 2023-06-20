import getLatestPosts from "./actions/getLatestPosts";
import getPostByTitle from "./actions/getPostByTitle";
import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import LatestPosts from "./components/home/LatestPosts";
import NewsletterSection from "./components/home/NewsletterSection";
export default async function Home() {
  const latestPosts = await getLatestPosts(3);
  const featuredPost = await getPostByTitle(
    "Exploring the Grand Line: Unveiling One Piece's Enigmatic World"
  );

  return (
    <div className="relative">
      <div className="overflow-hidden hidden md:block absolute top-0 -z-10 scale-x-[-1]">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: "#F6E9DD", width: "200%", height: 500 }}
        >
          <path d="M1200 120L0 16.48V0h1200v120z" />
        </svg>
      </div>
      <Intro />
      <Hero post={featuredPost} />
      <NewsletterSection />
      <LatestPosts posts={latestPosts} />
    </div>
  );
}
