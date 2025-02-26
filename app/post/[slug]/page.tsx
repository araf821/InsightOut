import getPostsByTag from "@/app/actions/getPostsByTag";
import SimilarPosts from "./SimilarPosts";
import Post from "./Post";
import getPostsByAuthor from "@/app/actions/getPostsByAuthor";
import MoreFromAuthor from "./MoreFromAuthor";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import prismaClient from "@/lib/prismadb";
import PostComments from "../../../components/comments/PostComments";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const currentUser = await getCurrentUser();

  const post = await prismaClient.post.findUnique({
    where: {
      slug: decodeURIComponent(slug),
      published: true,
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          replies: {
            include: {
              author: true,
            },
          },
          author: true,
        },
      },
    },
  });

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
        <Post currentUser={currentUser} post={post} />
        <PostComments
          currentUser={currentUser}
          postId={post.id}
          comments={post.comments}
        />

        <SimilarPosts posts={suggestedPosts ?? []} />
        {postsFromAuthor?.length ? (
          <MoreFromAuthor
            posts={postsFromAuthor}
            authorName={`More From ${post.author.name || "Author"}`}
          />
        ) : null}
      </Container>
    </main>
  );
};
export default PostPage;
