import getLatestPosts from "./actions/getLatestPosts";
import getPostByTitle from "./actions/getPostByTitle";
import Chat from "./components/chat/Chat";
import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import LatestPosts from "./components/home/LatestPosts";
import NewsletterSection from "./components/home/NewsletterSection";

export const revalidate = 60;

export default async function Home() {
  const latestPosts = await getLatestPosts(3);
  const featuredPost = await getPostByTitle(
    "Exploring the Grand Line: Unveiling One Piece's Enigmatic World"
  );

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
      <Intro />
      <Hero post={featuredPost} />
      <NewsletterSection />
      <LatestPosts posts={latestPosts} />
      <Chat />
    </div>
  );
}
