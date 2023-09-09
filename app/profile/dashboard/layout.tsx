import { getSession } from "@/app/actions/users/getCurrentUser";
import Container from "@/components/Container";
import ProfileInformation from "@/components/dashboard/ProfileInformation";
import prismaClient from "@/lib/prismadb";
import { redirect } from "next/navigation";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session?.user?.email) {
    redirect("/");
  }

  const currentUser = await prismaClient.user.findFirst({
    where: {
      email: session.user.email,
    },
    include: {
      _count: {
        select: {
          posts: {
            where: {
              published: true,
            },
          },
        },
      },
    },
  });

  if (!currentUser) {
    redirect("/");
  }

  const following = await prismaClient.connection.findMany({
    where: {
      followerId: currentUser.id,
    },
    select: {
      following: true,
    },
  });

  const followers = await prismaClient.connection.findMany({
    where: {
      followingId: currentUser.id,
    },
    select: {
      follower: true,
    },
  });

  return (
    <Container className="space-y-4 py-8">
      <ProfileInformation
        user={currentUser}
        following={following}
        followers={followers}
      />
      {children}
    </Container>
  );
};

export default ProfileLayout;
