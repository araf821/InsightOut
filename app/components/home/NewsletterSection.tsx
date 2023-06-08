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
    <section className="mx-auto bg-zinc-800 py-8">
      <Container>
        <p className="text-center text-2xl text-white sm:text-3xl lg:text-4xl xl:text-5xl">
          <span className={merri.className}>
            Step Into An Insightful Wonderland
          </span>
        </p>
      </Container>
    </section>
  );
};

export default NewsletterSection;
