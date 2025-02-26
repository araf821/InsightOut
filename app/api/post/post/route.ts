import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { postLimiter } from "@/lib/rate-limiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // Get IP from headers
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
  const { success } = await postLimiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        message: "You're writing too many posts!",
      },
      { status: 429 }
    );
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
