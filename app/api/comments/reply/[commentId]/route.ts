import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const { comment, postId } = await req.json();
    const { commentId } = params;
    const currentUser = await getCurrentUser();

    if (!commentId) {
      return new NextResponse("Comment ID Missing", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (comment.length < 3 || comment.length > 252) {
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
    console.log("Comment Creation Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
