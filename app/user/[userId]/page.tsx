import getCurrentUser from "@/app/actions/users/getCurrentUser";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { dateFormat } from "@/lib/helpers/dateFormat";
import prismaClient from "@/lib/prismadb";
import Image from "next/image";
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
      followers: true,
      following: true,
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

  const alreadyFollowing = user.followers.find((follower) => {
    return follower.followerId === currentUser?.id;
  });

  return (
    <Container className="py-8">
      {/* User info */}
      <div className="flex w-full gap-8 rounded-md px-8 py-8 shadow-lg">
        <div className="relative aspect-square w-full max-w-[200px]">
          <Image
            alt="user image"
            fill
            src={user.image || ""}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <h1 className="text-3xl font-semibold">{user.name}</h1>
          <p className="text-lg font-light">
            Date Joined: {dateFormat(user.createdAt.toISOString())}
          </p>
          <button className="w-fit rounded-sm bg-secondary px-2 py-1.5 text-left text-lg text-zinc-700">
            {alreadyFollowing ? "Unfollow" : "Follow"}
          </button>
          <hr />

          {/* Numbers */}
          <div className="flex max-w-[800px] items-center justify-between font-josefin text-3xl font-light text-zinc-700">
            <button className="cursor-pointer transition hover:text-zinc-900">
              {user.posts.length} Posts
            </button>
            <button className="cursor-pointer transition hover:text-zinc-900">
              {user.followers.length} Followers
            </button>
            <button className="cursor-pointer transition hover:text-zinc-900">
              {user.following.length} Following
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default UserPage;
