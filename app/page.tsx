import getLatestPosts from "./actions/getLatestPosts";
import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import LatestPosts from "./components/home/LatestPosts";
import NewsletterSection from "./components/home/NewsletterSection";
export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <div>
      <Intro />
      <Hero />
      <NewsletterSection />
      <LatestPosts posts={latestPosts} />
    </div>
  );
}
