import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  postId: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;
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

  const updatedPost = await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      published: !post.published,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;
  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid listing ID.");
  }

  const deletedPost = await prismaClient.post.deleteMany({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(deletedPost);
}