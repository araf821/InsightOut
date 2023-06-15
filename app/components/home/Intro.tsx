import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Container from "../Container";
import SocialProof from "./SocialProof";

const Intro = () => {
  return (
    <section className="w-full pb-6 pt-10">
      <Container>
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 text-zinc-800 lg:flex-row lg:gap-12 xl:gap-0">
          <div className="flex w-full flex-col items-center justify-center gap-4 ">
            <p className="text-center font-merri text-4xl font-semibold sm:text-5xl md:text-6xl xl:text-[68px]">
              Welcome to the Insight<span className="text-accent">Out</span>{" "}
              Blog
            </p>
            <hr className="mx-auto -mt-0 w-20 border-4 border-accent lg:mx-0" />
            <p className="-mt-2 text-center text-xl sm:text-2xl md:text-3xl lg:text-left">
              We&rsquo;re more than just a blog.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-4">
            {/* Social Proof Section */}
            <div className="flex w-full max-w-[550px] flex-col items-center justify-center gap-6 lg:gap-8">
              <SocialProof
                icon={FaTwitter}
                followers="123,123,123"
                type="Followers"
              />
              <SocialProof
                icon={FaFacebook}
                followers="123,123,123"
                type="Likes"
              />
              <SocialProof
                icon={FaYoutube}
                followers="123,123,123"
                type="Subscribers"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Intro;
