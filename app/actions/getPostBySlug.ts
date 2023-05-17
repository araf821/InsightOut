import prismaClient from "../lib/prismadb";

interface IParams {
  slug: string;
}

const getPostBySlug = async (params: IParams) => {
  try {
    const { slug } = params;

    if (!slug) {
      return null;
    }

    const post = await prismaClient.post.findUnique({
      where: {
        slug: slug,
      },
    });

    return {
      ...post,
      createdAt: post?.createdAt.toISOString(),
      updatedAt: post?.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
};

export default getPostBySlug;
