import Container from "@/app/components/Container";
import PostForm from "./PostForm";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Chat from "./Chat";

const WritePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div className="py-8">
        {/* Heading */}
        <p className="text-4xl text-zinc-800 sm:text-5xl lg:text-6xl">
          <span className="font-josefin font-semibold">New Post</span>
        </p>
        <hr className="w-12 border-[3px] border-accent md:w-20 md:border-4" />

        {/* Main Content Container */}
        <div className="my-6 flex w-full flex-col justify-between gap-6 xl:flex-row">
          {/* Form */}
          <PostForm currentUser={currentUser} />

          {/* AD */}
          <Chat />
        </div>
      </div>
    </Container>
  );
};
export default WritePage;
