import DashboardClient from "./DashboardClient";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prismadb";

const DashboardPage = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }

  const postsFromUser = await prismaClient.post.findMany({
    where: {
      authorId: currentUser.id,
    },
    include: {
      author: true,
    },
  });

  return <DashboardClient postsFromUser={postsFromUser} />;
};

export default DashboardPage;
