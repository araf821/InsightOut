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
    <>
      <div>
        <svg id="visual" version="1.1" viewBox="0 528.02 900 72.98">
          <path
            d="M0 545L10.7 540.3C21.3 535.7 42.7 526.3 64.2 528.3C85.7 530.3 107.3 543.7 128.8 548.3C150.3 553 171.7 549 193 546.7C214.3 544.3 235.7 543.7 257 546C278.3 548.3 299.7 553.7 321.2 556.7C342.7 559.7 364.3 560.3 385.8 560.7C407.3 561 428.7 561 450 560.7C471.3 560.3 492.7 559.7 514.2 553C535.7 546.3 557.3 533.7 578.8 532.2C600.3 530.7 621.7 540.3 643 543.5C664.3 546.7 685.7 543.3 707 538.5C728.3 533.7 749.7 527.3 771.2 530.5C792.7 533.7 814.3 546.3 835.8 553.2C857.3 560 878.7 561 889.3 561.5L900 562L900 601L889.3 601C878.7 601 857.3 601 835.8 601C814.3 601 792.7 601 771.2 601C749.7 601 728.3 601 707 601C685.7 601 664.3 601 643 601C621.7 601 600.3 601 578.8 601C557.3 601 535.7 601 514.2 601C492.7 601 471.3 601 450 601C428.7 601 407.3 601 385.8 601C364.3 601 342.7 601 321.2 601C299.7 601 278.3 601 257 601C235.7 601 214.3 601 193 601C171.7 601 150.3 601 128.8 601C107.3 601 85.7 601 64.2 601C42.7 601 21.3 601 10.7 601L0 601Z"
            fill="#F6E9DD"
            stroke-linecap="round"
            stroke-linejoin="miter"
          />
        </svg>
      </div>
      <section className="relative bg-[#F6E9DD] py-10 lg:py-0">
        <div className="mx-auto max-w-[1550px] px-4 sm:px-6 md:px-10 xl:px-20">
          <div className="grid grid-cols-1 gap-12 text-center lg:grid-cols-2 lg:text-start">
            <p className="flex flex-col gap-1 font-yeseva text-5xl sm:text-6xl md:gap-2 md:text-7xl lg:gap-3  lg:text-left lg:text-7xl xl:text-[80px]">
              <span>Step Into An</span>
              <span>Insightful</span>
              <span>Wonderland</span>
            </p>
            <div className="justify flex flex-col space-y-5">
              <div className={josefin.className}>
                <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="font-semibold">Join Our Newsletter</span>
                </p>
                <p className="group">
                  We will surely spam you with content that you{" "}
                  <span className="transition duration-500 group-hover:opacity-0">
                    don&rsquo;t
                  </span>{" "}
                  love.
                </p>
              </div>
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
                <Button special label="Sign Up Now" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <svg id="visual" version="1.1" viewBox="0 0 900 67.86">
          <path
            d="M0 62L16.7 63.2C33.3 64.3 66.7 66.7 100 64C133.3 61.3 166.7 53.7 200 48.5C233.3 43.3 266.7 40.7 300 41.2C333.3 41.7 366.7 45.3 400 49.7C433.3 54 466.7 59 500 58.8C533.3 58.7 566.7 53.3 600 50.5C633.3 47.7 666.7 47.3 700 52C733.3 56.7 766.7 66.3 800 67.7C833.3 69 866.7 62 883.3 58.5L900 55L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
            fill="#F6E9DD"
            stroke-linecap="round"
            stroke-linejoin="miter"
          />
        </svg>
      </div>
    </>
  );
};

export default NewsletterSection;
