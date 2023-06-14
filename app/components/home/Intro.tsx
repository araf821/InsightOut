import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Container from "../Container";
import SocialProof from "./SocialProof";

const Intro = () => {
  return (
    <section className="w-full pb-12 pt-5">
      <Container>
        <div className="flex w-full flex-col gap-4">
          <p className="font-merri text-[60px] font-semibold">
            Welcome to the Insight<span className="text-accent">Out</span> Blog
          </p>
          <hr className="-mt-8 w-20 border-4 border-accent" />
          <p className="text-3xl">We&rsquo;re more than just a blog.</p>
          <p className="text-center text-lg">Let the numbers speak for us.</p>
          <hr className="mx-auto -mt-3 w-20 border-zinc-400" />

          {/* Social Proof Section */}
          <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
            <div className="flex w-full lg:w-fit flex-col justify-center gap-12 md:flex-row">
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
            </div>
            <SocialProof
              icon={FaYoutube}
              followers="123,123,123"
              type="Subscribers"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Intro;
