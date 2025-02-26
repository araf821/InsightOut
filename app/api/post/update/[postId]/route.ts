import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = await params;
  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid post ID.");
  }

  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const body = await request.json();
  const { title, content, imgSrc: image, tags, published, slug } = body;

  const updatedPost = await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      image,
      tags,
      published,
      slug,
    },
  });

  return NextResponse.json(updatedPost);
}
