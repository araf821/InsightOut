import prismaClient from "../../lib/prismadb";

const getLatestPosts = async (count: number) => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        published: true,
      },
      take: count,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true, // Include the author relation
      },
    });

    const safePosts = posts.map((post) => ({
      ...post,
      author: {
        id: post.author.id,
        name: post.author.name,
        image: post.author.image,
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    return null;
  }
};

export default getLatestPosts;
