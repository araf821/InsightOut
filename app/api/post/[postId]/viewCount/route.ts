import prismaClient from "@/lib/prismadb";
import { viewCountLimiter } from "@/lib/rate-limiter";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  postId: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const { postId } = params;
  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid post ID.");
  }
  
  // identifier used to determine if the request should be accepted or not,
  // user's ip address + the post id
  const identifier = request.ip ?? "127.0.0.1" + postId;
  const { success } = await viewCountLimiter.limit(identifier);

  if (!success) {
    return NextResponse.json(
      {
        message:
          "View count cannot be updated over and over again for the same post.",
      },
      { status: 429 }
    );
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
      views: post.views + 1,
    },
  });

  return NextResponse.json(updatedPost);
}
