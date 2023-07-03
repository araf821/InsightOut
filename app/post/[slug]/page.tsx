import getPostBySlug from "@/app/actions/getPostBySlug";
import getPostsByTag from "@/app/actions/getPostsByTag";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import SimilarPosts from "./SimilarPosts";
import Post from "./Post";

interface IParams {
  slug: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
  const { slug } = params;

  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return (
      <EmptyState
        title="Post Not Found"
        subtitle="If you weren't expecting this message, please leave us a report on what went wrong."
        button
      />
    );
  }

  let suggestedPosts = await getPostsByTag(post.tags[0], 3, post.id);

  return (
    <main className="single-post-page">
      <Container>
        <Post post={post} />

        {suggestedPosts && suggestedPosts.length > 0 ? (
          // <div>
          //   {suggestedPosts.map((post) => (
          //     <PostCard key={post.id} post={post} />
          //   ))}
          // </div>
          <SimilarPosts posts={suggestedPosts} />
        ) : (
          <div>No related posts</div>
        )}
      </Container>
    </main>
  );
};
export default PostPage;
