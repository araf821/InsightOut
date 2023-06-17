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
    <div>
      <Intro />
      <Hero post={featuredPost} />
      <NewsletterSection />
      <LatestPosts posts={latestPosts} />
    </div>
  );
}
