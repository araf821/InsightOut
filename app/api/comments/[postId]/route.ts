import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { comment } = await req.json();
    const { postId } = params;
    const currentUser = await getCurrentUser();

    if (!postId) {
      return new NextResponse("Post ID Missing", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    console.log(comment);

    const postedComment = await prismaClient.comment.create({
      data: {
        content: comment,
        authorId: currentUser.id,
        postId,
      },
    });

    return NextResponse.json(postedComment);
  } catch (error) {
    console.log("Internal Error", { status: 500 });
  }
}
