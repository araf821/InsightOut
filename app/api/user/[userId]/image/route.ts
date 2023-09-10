import getCurrentUser from "@/app/actions/users/getCurrentUser";
import prismaClient from "@/lib/prismadb";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Update user's name
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const { image } = await req.json();

    if (image.length < 3) {
      return new Response("Invalid request data given.", { status: 422 });
    }

    if (!currentUser || currentUser.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prismaClient.user.update({
      where: {
        id: params.userId,
      },
      data: {
        image,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError || error instanceof AxiosError) {
      return new Response("Invalid request data given.", { status: 422 });
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}
