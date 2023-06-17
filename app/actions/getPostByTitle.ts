import prismaClient from "../lib/prismadb";

const getPostByTitle = async (title: string) => {
  try {
    const post = await prismaClient.post.findFirst({
      where: {
        title: {
          equals: title,
        },
      },
      include: {
        author: true,
      },
    });

    if (post) {
      const safePost = {
        ...post,
        author: {
          id: post.author.id,
          name: post.author.name,
          image: post.author.image,
        },
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };

      return safePost;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export default getPostByTitle;
