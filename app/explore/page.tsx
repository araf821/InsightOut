import { FC } from "react";
import Container from "../components/Container";
import Search from "./Search";
import Heading from "../components/Heading";
import getAllPosts from "../actions/getAllPosts";

const page = async ({}) => {
  const posts = await getAllPosts();

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
