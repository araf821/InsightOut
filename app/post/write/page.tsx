import getPostByTitle from "@/app/actions/getPostByTitle";
import PostForm from "./PostForm";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import CardsContainer from "@/components/CardsContainer";
import getTrendingPosts from "@/app/actions/getTrendingPosts";

const WritePage = async () => {
  const currentUser = await getCurrentUser();
  const markdownGuide = await getPostByTitle(
    "Guide to Writing Markdown: Basic Syntax and Usage"
  );
  const blogWritingGuide = await getPostByTitle(
    "Mastering the Art of Blog Writing: Techniques for Success and Pitfalls to Avoid"
  );

  const trendingPosts = await getTrendingPosts(6);

  return (
    <Container>
      <div className="py-8">
        {/* Heading */}
        <Heading title="New Post" />

        {/* Main Content Container */}
        <div className="my-6 flex w-full flex-col justify-between gap-6 xl:flex-row">
          {/* Form */}
          <PostForm currentUser={currentUser} />
          <div className="flex flex-col gap-4">
            <Heading small title="Guides" />
            <section className="grid h-fit grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:max-w-[500px] xl:grid-cols-1">
              {markdownGuide && <PostCard post={markdownGuide} />}
              {blogWritingGuide && <PostCard post={blogWritingGuide} />}
            </section>
          </div>
        </div>

        <Heading small title="Trending Posts" />
        <CardsContainer>
          {trendingPosts?.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </CardsContainer>
      </div>
    </Container>
  );
};
export default WritePage;
