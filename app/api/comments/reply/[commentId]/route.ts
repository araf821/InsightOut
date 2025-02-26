import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const { comment, postId } = await req.json();
    const { commentId } = await params;
    const currentUser = await getCurrentUser();

    if (!commentId) {
      return new NextResponse("Comment ID Missing", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (comment.trim().length < 3 || comment.length > 252) {
      return new NextResponse("Invalid Comment", { status: 400 });
    }

    const newReply = await prismaClient.comment.update({
      where: {
        id: commentId,
      },
      data: {
        replies: {
          create: {
            content: comment,
            authorId: currentUser.id,
            postId,
          },
        },
      },
    });

    return NextResponse.json(newReply);
  } catch (error) {
    console.log("Comment Creation Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
