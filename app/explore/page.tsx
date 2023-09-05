import Search from "./Search";
import getSearchResults, { IPostParams } from "../actions/getSearchResults";
import TrendingPosts from "./TrendingPosts";
import getTopUsers from "../actions/users/getTopUsers";
import TopAuthors from "./TopAuthors";
import LatestInEntertainment from "./LatestInEntertainment";
import LatestInTechnology from "./LatestInTechnology";
import LatestInLifestyle from "./LatestInLifestyle";
import Container from "@/components/Container";
import getAllPosts from "../actions/getAllPosts";

interface ExploreProps {
  searchParams: IPostParams;
}

const page = async ({ searchParams }: ExploreProps) => {
  const [searchResults, topAuthors, allPosts] = await Promise.all([
    getSearchResults(searchParams),
    getTopUsers(6),
    getAllPosts(),
  ]);

  let trendingPosts = allPosts?.slice().sort((a, b) => b.views - a.views) || [];
  let entertainmentPosts = allPosts?.filter((post) =>
    post.tags.includes("Entertainment")
  );
  let techPosts = allPosts?.filter((post) => post.tags.includes("Technology"));
  let lifestylePosts = allPosts?.filter((post) =>
    post.tags.includes("Lifestyle")
  );

  return (
    <Container>
      <main className="space-y-4 py-8">
        <Search posts={searchResults ?? []} />
        <TrendingPosts posts={trendingPosts.slice(0, 6)} />
        <TopAuthors authors={topAuthors} />
        <hr />
        <LatestInEntertainment
          posts={entertainmentPosts?.slice(0, 3) || null}
        />
        <hr />
        <LatestInTechnology posts={techPosts?.slice(0, 3) || null} />
        <hr />
        <LatestInLifestyle posts={lifestylePosts?.slice(0, 3) || null} />
      </main>
    </Container>
  );
};

export default page;
