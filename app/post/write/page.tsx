import Container from "@/app/components/Container";
import PostForm from "./PostForm";

const WritePage = () => {
  return (
    <Container>
      <div className="py-8">
        {/* Heading */}
        <p className="text-4xl text-zinc-800 sm:text-5xl lg:text-6xl">
          <span className="font-merri font-bold">New Post</span>
        </p>
        <hr className="w-12 border-4 border-accent md:w-20" />

        {/* Main Content Container */}
        <div className="my-6 flex w-full flex-col justify-between gap-6 xl:flex-row">
          {/* Form */}
          <PostForm />

          {/* AD */}
          <div className="w-full max-w-[400px] rounded-md bg-primary p-4">
            <p className="text-xl">Ad Goes Here</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default WritePage;
