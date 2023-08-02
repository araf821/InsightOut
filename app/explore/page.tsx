import Search from "./Search";
import getSearchResults, { IPostParams } from "../actions/getSearchResults";
import TrendingPosts from "./TrendingPosts";
import getTrendingPosts from "../actions/getTrendingPosts";
import getTopUsers from "../actions/users/getTopUsers";
import TopAuthors from "./TopAuthors";
import getPostsByTag from "../actions/getPostsByTag";
import LatestInEntertainment from "./LatestInEntertainment";
import LatestInTechnology from "./LatestInTechnology";
import LatestInLifestyle from "./LatestInLifestyle";
import Container from "@/components/Container";

interface ExploreProps {
  searchParams: IPostParams;
}

const page = async ({ searchParams }: ExploreProps) => {
  const [
    searchResults,
    trendingPosts,
    topAuthors,
    latestInEntertainment,
    latestInTechnology,
    latestInLifestyle,
  ] = await Promise.all([
    getSearchResults(searchParams),
    getTrendingPosts(3),
    getTopUsers(6),
    getPostsByTag("entertainment", 3),
    getPostsByTag("technology", 3),
    getPostsByTag("lifestyle", 3),
  ]);

  return (
    <Container>
      <main className="space-y-4 py-8">
        <Search posts={searchResults} />
        <TrendingPosts posts={trendingPosts} />
        <TopAuthors authors={topAuthors} />
        <hr />
        <LatestInEntertainment posts={latestInEntertainment} />
        <hr />
        <LatestInTechnology posts={latestInTechnology} />
        <hr />
        <LatestInLifestyle posts={latestInLifestyle} />
      </main>
    </Container>
  );
};

export default page;
