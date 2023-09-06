import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const toFollowId = searchParams.get("toFollowId");

    if (!toFollowId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (user.id === toFollowId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const connection = await prismaClient.connection.create({
      data: {
        followerId: user.id,
        followingId: toFollowId,
      },
    });

    return NextResponse.json(connection);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
