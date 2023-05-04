import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { imgSrc: image, title, content, category } = body;
  const authorId = currentUser.id;
  const slug = slugify(title);

  const post = await prismaClient.post.create({
    data: {
      image,
      title,
      content,
      authorId,
      category,
      slug,
    },
  });

  return NextResponse.json(post);
}
