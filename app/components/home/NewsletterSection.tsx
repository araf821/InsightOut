import { Merriweather } from "next/font/google";
import { FC } from "react";
import Container from "../Container";

const merri = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

interface NewsletterSectionProps {}

const NewsletterSection: FC<NewsletterSectionProps> = ({}) => {
  return (
    <section className="bg-zinc-800 py-20">
      <div className="mx-auto max-w-[1550px] px-4 sm:px-6 md:px-10 xl:px-20">
        <div className="grid grid-cols-1 gap-12 text-white lg:grid-cols-2">
          <p className="flex flex-col gap-1 text-center text-5xl font-bold sm:text-6xl md:gap-2 md:text-7xl lg:gap-3  lg:text-left lg:text-7xl xl:text-[80px]">
            <span>Step Into</span>
            <span>The Insight</span>
            <span>Wonderland</span>
          </p>
          <div className="">
            <p className="text-center text-2xl font-semibold sm:text-3xl md:text-left md:text-4xl lg:text-5xl">
              <span className="text-[#ff804a]">Join Our Newsletter</span>
            </p>
            <input
              type="email"
              placeholder="OutsightIn@jeemail.com"
              className="mt-4 w-full max-w-[700px] p-2 text-lg text-zinc-800 sm:text-xl md:text-left md:text-2xl"
            />
            <button className="mt-4 w-full max-w-[700px] bg-[#ff804a] p-3">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
