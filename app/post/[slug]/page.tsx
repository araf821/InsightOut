import getPostBySlug from "@/app/actions/getPostBySlug";
import getPostsByTag from "@/app/actions/getPostsByTag";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import PostCard from "@/app/components/PostCard";

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

  const suggestedPosts = await getPostsByTag(post.tags[0], 6, post.id);
  console.log(suggestedPosts);

  return (
    <main className="single-post-page">
      <Container>
        <p>{post.author.name}</p>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <p>{post.tags}</p>
        {suggestedPosts && suggestedPosts.length > 0 ? (
          <div>
            {suggestedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div>No related posts</div>
        )}
      </Container>
    </main>
  );
};
export default PostPage;
