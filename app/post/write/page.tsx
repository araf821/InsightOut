import Container from "@/app/components/Container";
import PostForm from "./PostForm";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Chat from "./Chat";
import Heading from "@/app/components/Heading";

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

          {/* AD */}
          <Chat />
        </div>
      </div>
    </Container>
  );
};
export default WritePage;
