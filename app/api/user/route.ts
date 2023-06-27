import prismaClient from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

// Update user info
export async function PUT(request: Request) {
  const body = await request.json();
  const { userId, name, image } = body;

  const user = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      image: image,
    },
  });

  return NextResponse.json(user);
}
