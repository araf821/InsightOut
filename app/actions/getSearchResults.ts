import prismaClient from "../lib/prismadb";

export interface IPostParams {
  keyword?: string;
}

export default async function getSearchResults(params: IPostParams) {
  try {
    const { keyword } = params;

    let query: any = {};

    if (keyword) {
      query.OR = [
        { title: { contains: keyword } },
        { content: { contains: keyword, mode: "insensitive" } },
        { tags: { has: keyword, mode: "insensitive" } },
      ];
    }

    const posts = await prismaClient.post.findMany({
      where: query,
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
