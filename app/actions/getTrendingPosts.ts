import prismaClient from "../../lib/prismadb";

export default async function getTrendingPosts(count?: number) {
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

    return posts;
  } catch (error: any) {
    return null;
  }
}
