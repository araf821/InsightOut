import prismaClient from "../../lib/prismadb";

export const revalidate = 500;

const getAllPosts = async () => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error: any) {
    return null;
  }
};

export default getAllPosts;
