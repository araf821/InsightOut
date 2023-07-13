import Container from "../components/Container";
import Search from "./Search";
import Heading from "../components/Heading";
import getSearchResults, { IPostParams } from "../actions/getSearchResults";
import TrendingPosts from "./TrendingPosts";
import getTrendingPosts from "../actions/getTrendingPosts";

interface ExploreProps {
  searchParams: IPostParams;
}

const page = async ({ searchParams }: ExploreProps) => {
  let searchResults = await getSearchResults(searchParams);
  const trendingPosts = await getTrendingPosts(3);

  return (
    <Container>
      <main className="space-y-4 py-8">
        <Search posts={searchResults} />
        <hr />
        <TrendingPosts posts={trendingPosts} />
        
      </main>
    </Container>
  );
};

export default page;
