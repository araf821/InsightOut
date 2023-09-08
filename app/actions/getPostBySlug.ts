import prismaClient from "../../lib/prismadb";

const getPostBySlug = async (slug: string) => {
  try {
    if (!slug) {
      return null;
    }

    const post = await prismaClient.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: true,
      },
    });

    return post ?? null;
  } catch (error: any) {
    return null;
  }
};
export default getPostBySlug;
