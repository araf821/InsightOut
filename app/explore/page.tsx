import Container from "../components/Container";
import Search from "./Search";
import getSearchResults, { IPostParams } from "../actions/getSearchResults";
import TrendingPosts from "./TrendingPosts";
import getTrendingPosts from "../actions/getTrendingPosts";
import getTopUsers from "../actions/users/getTopUsers";
import TopAuthors from "./TopAuthors";

interface ExploreProps {
  searchParams: IPostParams;
}

const page = async ({ searchParams }: ExploreProps) => {
  const searchResults = await getSearchResults(searchParams);
  const trendingPosts = await getTrendingPosts(3);
  const topAuthors = await getTopUsers(6);

  return (
    <Container>
      <main className="space-y-4 py-8">
        <Search posts={searchResults} />
        <hr />
        <TrendingPosts posts={trendingPosts} />
        <hr />
        <TopAuthors authors={topAuthors} />
        <hr />
        {/* <LatestInNews posts={latestInNews} /> */}
      </main>
    </Container>
  );
};

export default page;
