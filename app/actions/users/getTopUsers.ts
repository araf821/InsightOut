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

    return topUsers
  } catch (e) {
    return null;
  }
}
