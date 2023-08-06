import prismaClient from "../lib/prismadb";

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

export default getAllPosts;
