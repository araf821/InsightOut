import getAllPosts from "@/app/actions/getAllPosts";
import Container from "@/components/Container";
import AllPostsClient from "./AllPostsClient";

const AllPostsPage = async () => {
  const allPosts = await getAllPosts();

  if (!allPosts) return null;

  return (
    <main className="py-8 xl:py-12">
      <Container>
        <AllPostsClient posts={allPosts} />
      </Container>
    </main>
  );
};
export default AllPostsPage;
