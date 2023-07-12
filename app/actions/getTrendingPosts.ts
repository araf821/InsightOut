import prismaClient from "../lib/prismadb";

export default async function getTrendingPosts(count: number) {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      include: {
        author: true, // Include the author relation
      },
      take: count,
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
}
