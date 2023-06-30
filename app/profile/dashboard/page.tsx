import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostsByUser from "@/app/actions/getPostsByUser";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Image from "next/image";

type PostWithoutUser = {
  createdAt: string;
  updatedAt: string;
  id: string;
  title: string;
  content: string;
  slug: string;
  image: string;
  tags: string[];
  published: boolean;
  authorId: string;
};

const Dashboard = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  //@ts-ignore
  const postsFromUser: PostWithoutUser[] = await getPostsByUser(currentUser.id);

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    let dateToString = "";

    switch (month) {
      case "01":
        dateToString = "Jan";
        break;

      case "02":
        dateToString = "Feb";
        break;

      case "03":
        dateToString = "Mar";
        break;

      case "04":
        dateToString = "Apr";
        break;

      case "05":
        dateToString = "May";
        break;

      case "06":
        dateToString = "Jun";
        break;

      case "07":
        dateToString = "Jul";
        break;

      case "08":
        dateToString = "Aug";
        break;

      case "09":
        dateToString = "Sept";
        break;

      case "10":
        dateToString = "Oct";
        break;

      case "11":
        dateToString = "Nov";
        break;

      case "12":
        dateToString = "Dec";
        break;

      default:
        break;
    }

    return `${dateToString} ${day}, ${year}`;
  };

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

            <div className="flex w-full flex-col gap-2 py-4 font-josefin sm:px-2 sm:py-0">
              <p className="font-merri text-2xl font-semibold">
                {currentUser.name}
              </p>
              <p className="text-xl">
                Member Since: {formatDate(currentUser.createdAt.split("T")[0])}
              </p>
              <p className="text-xl">Posts published: {postsFromUser.length}</p>
              <p className="text-xl">Posts published: {postsFromUser.length}</p>
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
