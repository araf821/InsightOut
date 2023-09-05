import prismaClient from "../../lib/prismadb";

const getPostsByAuthor = async (
  authorId: string,
  count: number,
  postId: string
) => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        authorId: authorId,
        published: true,
        NOT: {
          id: postId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
      take: count,
    });

    return posts;
  } catch (error: any) {
    return null;
  }
};

export default getPostsByAuthor;
