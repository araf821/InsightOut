import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="mx-auto h-96 w-full max-w-[1536px] px-4 sm:px-6 md:px-10 xl:px-20">
      <section className="h-96 w-full rounded-md bg-zinc-800"></section>
    </footer>
  );
};

export default Footer;
