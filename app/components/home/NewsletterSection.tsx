"use client";

import { Josefin_Sans } from "next/font/google";
import { FC } from "react";
import Button from "../Button";

const josefin = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

interface NewsletterSectionProps {}

const NewsletterSection: FC<NewsletterSectionProps> = ({}) => {
  return (
    <div className="relative">
      {/* <div>
        <svg id="visual" version="1.1" viewBox="0 528.02 900 72.98">
          <path
            d="M0 574L21.5 572.7C43 571.3 86 568.7 128.8 568.3C171.7 568 214.3 570 257.2 571.2C300 572.3 343 572.7 385.8 570.7C428.7 568.7 471.3 564.3 514.2 562.3C557 560.3 600 560.7 642.8 562.5C685.7 564.3 728.3 567.7 771.2 570.5C814 573.3 857 575.7 878.5 576.8L900 578L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
            fill="#F6E9DD"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </div> */}
      <div className="absolute top-0 -z-10 -translate-y-full overflow-hidden">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: 300,
            transform: "rotate(180deg) scaleX(-1)",
          }}
          className="fill-secondary"
        >
          <path d="M1200 120L0 16.48V0h1200v120z" />
        </svg>
      </div>
      <section className="relative bg-secondary pb-10 lg:pt-10">
        <div className="mx-auto max-w-[1550px] px-4 sm:px-6 md:px-10 xl:px-20">
          <div className="grid grid-cols-1 gap-12 text-center lg:grid-cols-2 lg:text-start">
            <p className="flex flex-col gap-1 font-merri text-5xl sm:text-6xl md:gap-2 md:text-7xl lg:gap-3  lg:text-left lg:text-7xl xl:text-[80px]">
              <span>Step Into An</span>
              <span>Insightful</span>
              <span>Wonderland</span>
            </p>
            <div className="justify flex flex-col space-y-5">
              <div className={josefin.className}>
                <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="font-semibold">Join Our Newsletter</span>
                </p>
                <p className="group mx-auto w-fit lg:mx-0 ">
                  We will surely spam you with content that you{" "}
                  <span className="transition duration-500 group-hover:hidden">
                    don&rsquo;t
                  </span>{" "}
                  love.
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full outline-none max-w-[700px] rounded-sm border-b-2 border-zinc-700 px-4 py-2 text-lg text-zinc-800 focus:border-b-4 sm:text-xl md:text-left md:text-2xl"
                />
                <input
                  type="email"
                  placeholder="OutsightIn@jeemail.com"
                  className="w-full outline-none max-w-[700px] rounded-sm border-b-2 border-zinc-700 px-4 py-2 text-lg text-zinc-800 focus:border-b-4 sm:text-xl md:text-left md:text-2xl"
                />
                <Button
                  special
                  label="Sign Up Now"
                  className="mx-auto max-w-[700px] border-accent"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <svg
          id="visual"
          version="1.1"
          className="fill-secondary"
          viewBox="0 0 900 67.86"
        >
          <path
            d="M0 62L16.7 63.2C33.3 64.3 66.7 66.7 100 64C133.3 61.3 166.7 53.7 200 48.5C233.3 43.3 266.7 40.7 300 41.2C333.3 41.7 366.7 45.3 400 49.7C433.3 54 466.7 59 500 58.8C533.3 58.7 566.7 53.3 600 50.5C633.3 47.7 666.7 47.3 700 52C733.3 56.7 766.7 66.3 800 67.7C833.3 69 866.7 62 883.3 58.5L900 55L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewsletterSection;
