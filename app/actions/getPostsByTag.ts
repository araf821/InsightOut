import prismaClient from "../lib/prismadb";

const getPostsByTag = async (tag: string, count: number, postId: string) => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        tags: {
          has: tag,
        },
        published: true,
        NOT: {
          id: postId,
        },
      },
      include: {
        author: true,
      },
      take: count,
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: {
        id: post.author.id,
        name: post.author.name,
        image: post.author.image,
      },
    }));

    return safePosts;
  } catch (error: any) {
    return null;
  }
};

export default getPostsByTag;
