import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  postId?: string;
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
