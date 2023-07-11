import Container from "../components/Container";
import Search from "./Search";
import Heading from "../components/Heading";
import getSearchResults, { IPostParams } from "../actions/getSearchResults";

interface ExploreProps {
  searchParams: IPostParams;
}

const page = async ({ searchParams }: ExploreProps) => {
  let posts = await getSearchResults(searchParams);

  return (
    <Container>
      <main className="space-y-4 py-8">
        <Search posts={posts} />
        <Heading title="Trending Posts" />
      </main>
    </Container>
  );
};

export default page;
