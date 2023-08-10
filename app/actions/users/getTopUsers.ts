// This method will fetch the top {count} authors

import prismaClient from "@/lib/prismadb";

export default async function getTopUsers(count: number) {
  try {
    const topUsers = await prismaClient.user.findMany({
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      take: count,
      include: {
        posts: true,
      },
    });

    const safeUsers = topUsers.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified:
        user.emailVerified === null ? null : user.emailVerified.toISOString(),
      posts: user.posts.map((post) => ({
        title: post.title,
        published: post.published,
      })),
    }));

    return safeUsers;
  } catch (e) {
    return null;
  }
}
