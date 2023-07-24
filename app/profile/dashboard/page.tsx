import getPostsByUser from "@/app/actions/getPostsByUser";
import { SafePost } from "@/app/types";
import DashboardClient from "./DashboardClient";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import Container from "@/components/Container";

const Dashboard = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  //@ts-ignore
  const postsFromUser: SafePost[] = await getPostsByUser(currentUser.id);

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
