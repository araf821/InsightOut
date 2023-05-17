import prismaClient from "../lib/prismadb";

const getAllPosts = async () => {
  try {
    const posts = await prismaClient.post.findMany();

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    return null;
  }
};

export default getAllPosts;
