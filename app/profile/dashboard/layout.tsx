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

  const allFollowings = await prismaClient.connection.findMany({
    where: {
      followerId: currentUser.id,
    },
    select: {
      following: true,
    },
  });

  // getting all the ids of the people we are following
  const followingIds = allFollowings.map((item) => item.following?.id);

  const allFollowers = await prismaClient.connection.findMany({
    where: {
      followingId: currentUser.id,
    },
    select: {
      follower: true,
    },
  });

  // Compare the followingIds with each follower to check if we are also following that user
  const followers = allFollowers.map((connection) => ({
    ...connection,
    isFollowed: followingIds.includes(connection.follower?.id),
  }));

  const followings = allFollowings.map((connection) => ({
    ...connection,
    isFollowed: followingIds.includes(connection.following?.id),
  }));

  return (
    <Container className="space-y-4 py-8">
      <ProfileInformation
        user={currentUser}
        following={followings}
        followers={followers}
      />
      {children}
    </Container>
  );
};

export default ProfileLayout;
