import prismaClient from "../../lib/prismadb";

const getPostsByTag = async (tag: string, count: number, postId?: string) => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        tags: {
          has: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
        },
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

export default getPostsByTag;
