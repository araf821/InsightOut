import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostsByUser from "@/app/actions/getPostsByUser";
import Container from "@/app/components/Container";
import { SafePost } from "@/app/types";
import DashboardClient from "./DashboardClient";

const Dashboard = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  //@ts-ignore
  const postsFromUser: SafePost[] = await getPostsByUser(currentUser.id, 6);

  return (
    <Container>
      <DashboardClient
        userName={currentUser.name}
        userImage={currentUser.image}
        userCreated={currentUser.createdAt}
        postsFromUser={postsFromUser}
      />
    </Container>
  );
};

export default Dashboard;
