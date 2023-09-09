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

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const toUnfollowId = searchParams.get("toUnfollowId");

    if (!toUnfollowId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (user.id === toUnfollowId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    await prismaClient.connection.delete({
      where: {
        followingId_followerId: {
          followerId: user.id,
          followingId: toUnfollowId,
        },
      },
    });

    const following = await prismaClient.connection.findMany({
      where: {
        followerId: user.id,
      },
      select: {
        following: true,
      },
    });

    return NextResponse.json(following);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
