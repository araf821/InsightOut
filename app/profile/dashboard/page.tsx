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

  const postsFromUser: any[] = await getPostsByUser(currentUser?.id);

  return (
    <Container>
      <section className="py-8">
        <Heading title="Dashboard" />
        {/* Author Info */}
        <div className="my-8 grid grid-cols-1 gap-4  lg:grid-cols-5">
          {/* Main info */}
          <div className="relative flex w-full overflow-hidden rounded-l-lg bg-secondary shadow-md lg:col-span-3">
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

            <div className="flex w-full flex-col gap-3 px-3 py-4">
              <p className="text-3xl font-semibold">
                <span className="rounded-md bg-zinc-800 px-3 py-1.5 text-white ">
                  {currentUser.name}
                </span>
              </p>
              <p className="font-josefin text-xl">
                Posts published: {postsFromUser.length}
              </p>
            </div>
          </div>

          {/* Followers/Following */}
          <div className="relative flex h-full w-full flex-col items-center justify-between gap-2 font-josefin text-neutral-800 opacity-70 md:flex-row lg:col-span-2 lg:flex-col">
            <div className="grid h-full w-full items-center rounded-md bg-secondary px-6 text-5xl shadow-md">
              <div className="flex translate-y-1 flex-row gap-8">
                <span>0</span>
                <div className="border-l-2 border-neutral-300" />
                <span className="my-auto text-3xl">Followers</span>
              </div>
            </div>

            <div className="grid h-full w-full items-center rounded-md bg-secondary px-6 text-5xl shadow-md">
              <div className="flex flex-row gap-8">
                <span>0</span>
                <div className="border-l-2 border-neutral-300" />
                <span className="my-auto text-3xl">Following</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
