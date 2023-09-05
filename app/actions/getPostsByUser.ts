import { NextResponse } from "next/server";
import prismaClient from "../../lib/prismadb";

const getPostsByUser = async (userId: string, count: number) => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
      take: count,
    });

    return posts;
  } catch (error: any) {
    return null;
  }
};

export default getPostsByUser;
