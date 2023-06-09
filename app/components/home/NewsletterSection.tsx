import { Merriweather } from "next/font/google";
import { FC } from "react";

const merri = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

interface NewsletterSectionProps {}

const NewsletterSection: FC<NewsletterSectionProps> = ({}) => {
  return (
    <section className="relative bg-zinc-800 py-20">
      {/* <Image src="/images/wave-haikei.svg" alt="wave" fill className="w-full absolute top-0" /> */}
      <div className="mx-auto max-w-[1550px] px-4 sm:px-6 md:px-10 xl:px-20">
        <div className="grid grid-cols-1 gap-12 text-center text-white lg:grid-cols-2 lg:text-start">
          <p className="flex flex-col gap-1 font-yeseva text-5xl font-bold tracking-wider sm:text-6xl md:gap-2 md:text-7xl lg:gap-3  lg:text-left lg:text-7xl xl:text-[80px]">
            <span>Step Into</span>
            <span>The Insight</span>
            <span>Wonderland</span>
          </p>
          <div className="flex flex-col justify space-y-5">
            <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-[#ff804a]">Join Our Newsletter</span>
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full max-w-[700px] px-4 py-2 text-lg text-zinc-800 sm:text-xl md:text-left md:text-2xl"
              />
              <input
                type="email"
                placeholder="OutsightIn@jeemail.com"
                className="w-full max-w-[700px] px-4 py-2 text-lg text-zinc-800 sm:text-xl md:text-left md:text-2xl"
              />
              <button className="w-full max-w-[700px] bg-[#ff804a] p-3">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
