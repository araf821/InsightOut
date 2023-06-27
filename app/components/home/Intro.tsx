import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Container from "../Container";
import SocialProof from "./SocialProof";
import DynamicTextEffect from "../texts/DynamicTextEffect";

const Intro = () => {
  return (
    <section className="w-full pb-8 pt-10">
      <Container>
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 lg:flex-row lg:gap-12 xl:gap-0">
          <div className="flex w-full flex-col items-center gap-4 text-zinc-800">
            <p className="balance text-center text-transparent bg-gradient-to-br from-blue-700 via-zinc-800 to-accent bg-clip-text font-josefin text-4xl font-bold sm:text-5xl md:text-6xl lg:text-left xl:text-[68px]">
              Welcome to the Insight<span className="">Out</span>{" "}
              Blog
            </p>
            <hr className="mx-auto -mt-0 w-20 self-start border-4 border-accent lg:mx-0" />
            <DynamicTextEffect />
          </div>
          <div className="flex w-full flex-col items-center gap-4">
            {/* Social Proof Section */}
            <div className="flex w-full max-w-[550px] flex-col items-center justify-center gap-6 lg:gap-8 xl:items-end">
              <SocialProof
                icon={FaTwitter}
                followers="1,135,985"
                type="Followers"
                className="xl:max-w-[350px]"
              />
              <SocialProof
                icon={FaInstagram}
                followers="646,481,332"
                type="Followers"
                className="xl:max-w-[450px]"
              />
              <SocialProof
                icon={FaYoutube}
                followers="30,323,754"
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
