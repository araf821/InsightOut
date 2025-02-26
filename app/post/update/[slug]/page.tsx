import PostForm from "../../write/PostForm";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import getPostBySlug from "@/app/actions/getPostBySlug";
import Container from "@/components/Container";

interface IParams {
  slug: string;
}

const UpdatePage = async ({ params }: { params: Promise<IParams> }) => {
  const { slug } = await params;

  const currentUser = await getCurrentUser();
  const post = await getPostBySlug(decodeURIComponent(slug));

  return (
    <Container>
      <main className="py-8">
        <PostForm currentUser={currentUser} post={post} />
      </main>
    </Container>
  );
};

export default UpdatePage;
