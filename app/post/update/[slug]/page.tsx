import Container from "@/app/components/Container";
import PostForm from "../../write/PostForm";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import getPostBySlug from "@/app/actions/getPostBySlug";

interface IParams {
  slug: string;
}

const UpdatePage = async ({ params }: { params: IParams }) => {
  const { slug } = params;

  const currentUser = await getCurrentUser();
  const post = await getPostBySlug(decodeURIComponent(slug));
  console.log(post);

  return (
    <Container>
      <main className="py-8">
        <PostForm currentUser={currentUser} post={post} />
      </main>
    </Container>
  );
};

export default UpdatePage;
