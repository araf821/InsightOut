import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      postId: string;
    }>;
  }
) {
  try {
    const { comment } = await req.json();
    const { postId } = await params;
    const currentUser = await getCurrentUser();

    if (!postId) {
      return new NextResponse("Post ID Missing", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (comment.trim().length < 3 || comment.length > 252) {
      return new NextResponse("Invalid Comment", { status: 400 });
    }

    const postedComment = await prismaClient.comment.create({
      data: {
        content: comment,
        authorId: currentUser.id,
        postId,
      },
    });

    return NextResponse.json(postedComment);
  } catch (error) {
    console.log("Comment Creation Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
