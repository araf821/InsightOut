import prismaClient from "../lib/prismadb";

export interface IPostParams {
  keyword?: string;
}

export default async function getSearchResults(params: IPostParams) {
  try {
    const { keyword } = params;

    if (keyword === "") {
      return [];
    }

    const posts = await prismaClient.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
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
  } catch (e: any) {
    return null;
  }
}
