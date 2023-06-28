import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostsByUser from "@/app/actions/getPostsByUser";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { Post } from "@prisma/client";
import Image from "next/image";

const Dashboard = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const postsFromUser: Post[] = await getPostsByUser(currentUser?.id);

  return (
    <Container>
      <section className="py-8">
        <Heading title="Dashboard" />
        {/* Author Info */}
        <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Main info */}
          <div className="relative flex w-full overflow-hidden rounded-l-lg bg-secondary">
            {/* Image component */}
            <div className="relative h-[100px] max-h-[200px] w-[100px] max-w-[200px] md:h-[200px] md:w-full">
              <Image
                //@ts-ignore
                src={currentUser?.image || "/images/placeholder.jpg"}
                alt="current user profile"
                fill
                className="h-[200px] object-cover"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <p>{currentUser.name}</p>
              <p>Posts published: {postsFromUser.length}</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
