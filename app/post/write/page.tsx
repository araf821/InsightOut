import Container from "@/app/components/Container";
import PostForm from "./PostForm";
import Heading from "@/app/components/Heading";
import getCurrentUser from "@/app/actions/users/getCurrentUser";

const WritePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div className="py-8">
        {/* Heading */}
        <Heading title="New Post" />

        {/* Main Content Container */}
        <div className="my-6 flex w-full flex-col justify-between gap-6 xl:flex-row">
          {/* Form */}
          <PostForm currentUser={currentUser} />

          {/* Ads or whatever go here */}
          <section className="flex w-full max-w-[400px] flex-col gap-4">
            <div className="grid h-full w-full place-items-center bg-primary">
              <p className="text-4xl text-white">Ad Goes Here</p>
            </div>

            <div className="grid h-full w-full place-items-center bg-accent">
              <p className="text-4xl text-white">Ad Goes Here</p>
            </div>

            <div className="grid h-full w-full place-items-center bg-primary">
              <p className="text-4xl text-white">Ad Goes Here</p>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};
export default WritePage;
