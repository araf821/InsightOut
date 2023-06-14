import { FaTwitter } from "react-icons/fa";
import Container from "../Container";

const Intro = () => {
  return (
    <section className="w-full py-6">
      <Container>
        <div className="flex w-full flex-col gap-4">
          <p className="font-merri text-[60px] font-semibold">
            Welcome to the Insight<span className="text-accent">Out</span> Blog
          </p>
          <hr className="-mt-8 w-20 border-4 border-accent" />
          <p className="text-3xl">We&rsquo;re more than just a blog.</p>
          <p className="text-center text-lg">Let the numbers speak for us.</p>

          {/* Social Proof Section */}
          <div className="flex flex-col justify-center md:flex-row gap-8">
            {/* <SocialProof icon={} followers="" /> */}
            <div className="flex gap-8 rounded-lg bg-primary px-6 py-3">
              <FaTwitter className="text-7xl" />
              <div className="flex flex-col justify-center">
                <p className="text-2xl">123,321,123</p>
                <p className="text-xl">Followers</p>
              </div>
            </div>

            <div className="flex gap-8 rounded-lg bg-primary px-6 py-3">
              <FaTwitter className="text-7xl" />
              <div className="flex flex-col justify-center">
                <p className="text-2xl">123,321,123</p>
                <p className="text-xl">Followers</p>
              </div>
            </div>

            <div className="flex gap-8 rounded-lg bg-primary px-6 py-3">
              <FaTwitter className="text-7xl" />
              <div className="flex flex-col justify-center">
                <p className="text-2xl">123,321,123</p>
                <p className="text-xl">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Intro;
