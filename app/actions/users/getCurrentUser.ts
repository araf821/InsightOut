import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prismaClient from "../../../lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismaClient.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      //@ts-ignore
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };

  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;