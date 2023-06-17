import getPostBySlug from "@/app/actions/getPostBySlug";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  slug: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
  const { slug } = params;

  const post = await getPostBySlug({ slug });

  if (!post) {
    return <EmptyState title="Nothing to see here :/" subtitle="This page may still be under construction." button />;
  }

  return <div>idk</div>;
};
export default PostPage;
