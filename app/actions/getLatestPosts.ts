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

    return posts;
  } catch (error: any) {
    return null;
  }
};

export default getLatestPosts;
