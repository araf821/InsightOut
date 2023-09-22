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

  return (
    <Container className="py-8">
      {/* User info */}
      <IndividualUserInfo currentUser={currentUser} user={user} />
    </Container>
  );
};
export default UserPage;
