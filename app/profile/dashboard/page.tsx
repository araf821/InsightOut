import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostsByUser from "@/app/actions/getPostsByUser";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import PostCard from "@/app/components/PostCard";
import { dateFormat } from "@/app/lib/helpers/dateFormat";
import { SafePost } from "@/app/types";
import Image from "next/image";

const Dashboard = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  //@ts-ignore
  const postsFromUser: SafePost[] = await getPostsByUser(currentUser.id, 6);

  return (
    <Container>
      <section className="py-8">
        <Heading title="Dashboard" />
        {/* Author Info */}
        <div className="my-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Main info */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-t-lg bg-secondary px-2 py-3 shadow-md sm:flex-row sm:rounded-l-lg lg:col-span-3">
            {/* Image component */}
            <div className="relative  aspect-square w-full sm:max-w-[200px] md:h-[200px]">
              <Image
                //@ts-ignore
                src={currentUser?.image || "/images/placeholder.jpg"}
                alt="current user profile"
                fill
                className="rounded-md object-cover"
              />
            </div>

            <div className="flex w-full flex-col gap-2 pt-4 font-josefin sm:px-2 sm:py-0">
              <p className="font-merri text-2xl font-semibold">
                {currentUser.name}
              </p>
              <hr className="border-neutral-300" />
              <p className="text-xl font-light">
                Member Since: {dateFormat(currentUser.createdAt)}
              </p>
              <p className="text-xl font-light">
                Posts published: {postsFromUser.length}
              </p>
            </div>
          </div>

          {/* Followers/Following */}
          <div className="relative flex h-full w-full cursor-not-allowed flex-col items-center justify-between gap-2 font-josefin text-neutral-800 md:flex-row lg:col-span-2 lg:flex-col">
            <div className="absolute right-0 top-0 z-10 rounded-bl-md rounded-tr-md bg-secondary px-2 py-1 text-zinc-800 shadow-md md:text-base">
              Coming Soon
            </div>
            <div className="blur-sms grid h-full w-full items-center rounded-md bg-secondary px-6 opacity-50 shadow-md">
              <div className="flex translate-y-1 flex-row gap-8 py-4">
                <span className="text-xl md:text-2xl lg:text-3xl">0</span>
                <div className="border-l-2 border-neutral-300" />
                <span className="my-auto text-xl sm:text-2xl md:text-3xl">
                  Followers
                </span>
              </div>
            </div>

            <div className="blur- m grid h-full w-full items-center rounded-md bg-secondary px-6 opacity-50 shadow-md">
              <div className="flex translate-y-1 flex-row gap-8 py-4 md:py-0">
                <span className="text-xl md:text-2xl lg:text-3xl">0</span>
                <div className="border-l-2 border-neutral-300" />
                <span className="my-auto text-xl sm:text-2xl md:text-3xl">
                  Following
                </span>
              </div>
            </div>
          </div>
        </div>
        <Heading small center title="Your Latest Posts" />
        <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {postsFromUser.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </section>
    </Container>
  );
};

export default Dashboard;
