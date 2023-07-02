import getPostBySlug from "@/app/actions/getPostBySlug";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  slug: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
  const { slug } = params;
  console.log(decodeURI(slug));

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

  return (
    <main className="single-post-page">
      <Container>
        <p>{post.author.name}</p>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <p>{post.tags}</p>
      </Container>
    </main>
  );
};
export default PostPage;
