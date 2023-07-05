import getPostBySlug from "@/app/actions/getPostBySlug";
import getPostsByTag from "@/app/actions/getPostsByTag";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import SimilarPosts from "./SimilarPosts";
import Post from "./Post";
import getPostsByAuthor from "@/app/actions/getPostsByAuthor";
import MoreFromAuthor from "./MoreFromAuthor";

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

  const suggestedPosts = await getPostsByTag(post.tags[0], 3, post.id);
  const postsFromAuthor = await getPostsByAuthor(post.authorId, 3, post.id);

  return (
    <main className="single-post-page">
      <Container>
        <Post post={post} />

        {suggestedPosts?.length ? (
          // <div>
          //   {suggestedPosts.map((post) => (
          //     <PostCard key={post.id} post={post} />
          //   ))}
          // </div>
          <SimilarPosts posts={suggestedPosts} />
        ) : (
          <div>No related posts</div>
        )}

        {postsFromAuthor?.length && (
          <MoreFromAuthor
            posts={postsFromAuthor}
            authorName={`More From ${post.author.name || "Author"}`}
          />
        )}
      </Container>
    </main>
  );
};
export default PostPage;
