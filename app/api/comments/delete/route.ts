import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { commentId } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!commentId) {
      return new NextResponse("Comment ID is missing.", { status: 400 });
    }

    const deletedComment = await prismaClient.comment.update({
      where: {
        id: commentId,
        authorId: currentUser.id,
      },
      data: {
        deleted: true,
      },
    });

    return NextResponse.json(deletedComment);
  } catch (error: any) {
    console.log("Comment Deletion Error", error);
    return new NextResponse("Internal Error: " + error.message, {
      status: 500,
    });
  }
}
