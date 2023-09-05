import prismaClient from "../../lib/prismadb";

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

    return post;
  } catch (error: any) {
    return null;
  }
};

export default getPostByTitle;
