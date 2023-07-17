import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { title, content, imgSrc: image, tags, published, slug } = body;

  const post = await prismaClient.post.create({
    data: {
      title,
      content,
      image,
      slug,
      tags,
      published,
      author: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(post);
}
