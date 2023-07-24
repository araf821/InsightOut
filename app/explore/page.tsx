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
  const searchResults = await getSearchResults(searchParams);
  const trendingPosts = await getTrendingPosts(3);
  const topAuthors = await getTopUsers(6);
  const latestInEntertainment = await getPostsByTag("entertainment", 3);
  const latestInTechnology = await getPostsByTag("technology", 3);
  const latestInLifestyle = await getPostsByTag("lifestyle", 3);
  
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
