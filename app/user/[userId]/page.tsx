import getCurrentUser from "@/app/actions/users/getCurrentUser";
import Container from "@/components/Container";
import IndividualUserInfo from "@/components/user/IndividualUserInfo";
import prismaClient from "@/lib/prismadb";
import { redirect } from "next/navigation";

export const metadata = {
  title: "User Page | InsightOut",
};

const UserPage = async ({ params }: { params: { userId: string } }) => {
  if (!params.userId) {
    redirect("/");
  }
  const currentUser = await getCurrentUser();

  // if (currentUser?.id === params.userId) {
  //   redirect("/profile/dashboard");
  // }

  const user = await prismaClient.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      posts: {
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  const allFollowing = await prismaClient.connection.findMany({
    where: {
      followerId: params.userId,
    },
    select: {
      following: true,
    },
  });

  const allFollowers = await prismaClient.connection.findMany({
    where: {
      followingId: params.userId,
    },
    select: {
      follower: true,
    },
  });

  return (
    <Container className="py-8">
      {/* User info */}
      <IndividualUserInfo
        currentUser={currentUser}
        followers={allFollowers}
        following={allFollowing}
        user={user}
      />
    </Container>
  );
};
export default UserPage;
