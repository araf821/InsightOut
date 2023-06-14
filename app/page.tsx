import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import LatestPosts from "./components/home/LatestPosts";
import NewsletterSection from "./components/home/NewsletterSection";
export default function Home() {
  return (
    <div>
      <Intro />
      <Hero />
      <NewsletterSection />
      <LatestPosts />
    </div>
  );
}
