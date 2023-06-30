import { NextResponse } from "next/server";
import prismaClient from "../lib/prismadb";

const getPostsByUser = async (userId: string) => {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        authorId: userId,
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
  } catch (error: any) {
    return new NextResponse(error);
  }
};

export default getPostsByUser;
