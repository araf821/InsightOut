import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostsByUser from "@/app/actions/getPostsByUser";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import PostCard from "@/app/components/PostCard";
import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost } from "@/app/types";
import Image from "next/image";
import { BsPen } from "react-icons/bs";
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
