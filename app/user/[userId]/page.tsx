import getCurrentUser from "@/app/actions/users/getCurrentUser";
import CardsContainer from "@/components/CardsContainer";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import PostCard from "@/components/post/PostCard";
import IndividualUserInfo from "@/components/user/IndividualUserInfo";
import prismaClient from "@/lib/prismadb";
import { redirect } from "next/navigation";

export const metadata = {
  title: "User Page | InsightOut",
};

const UserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  if (!userId) {
    redirect("/");
  }
  const currentUser = await getCurrentUser();

  // if (currentUser?.id === userId) {
  //   redirect("/profile/dashboard");
  // }

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
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
      followerId: userId,
    },
    select: {
      following: true,
    },
  });

  const allFollowers = await prismaClient.connection.findMany({
    where: {
      followingId: userId,
    },
    select: {
      follower: true,
    },
  });

  let currentUserFollows = null;
  if (currentUser) {
    currentUserFollows = await prismaClient.connection.findMany({
      where: {
        followerId: currentUser.id,
      },
      select: {
        followingId: true,
      },
    });
  }

  return (
    <Container className="pb-4">
      {/* User info */}
      <IndividualUserInfo
        currentUser={currentUser}
        followers={allFollowers}
        following={allFollowing}
        user={user}
        currentUserFollows={currentUserFollows}
      />
      {!!user.posts.length ? (
        <div className="mt-4">
          <Heading title={user.name + "'s Posts"} small />
          <CardsContainer>
            {user.posts.map((post) => (
              <PostCard key={post.id} post={{ ...post, author: user }} />
            ))}
          </CardsContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center font-josefin py-20 md:text-lg">
          {user.name} has not published any posts yet.
        </div>
      )}
    </Container>
  );
};
export default UserPage;
